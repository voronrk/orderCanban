import PostpressItem from "./PostpressItem.js";

export default class OrderItem {

    getSibling (id) {
        for (let item of this.data) {
            if (item['id']===id) {
                return item
            };
        };
        return null;
    };

    constructor(data={}) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','order-row');
        this.view.draggable=true;

        //=============for debug=================
        this.view.addEventListener('click', ()=> console.log(this.data));
        //=======================================

        this.view.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragging');
            // setTimeout(() => event.target.classList.add('is-hidden'), 0);
            this.data['previousOrder']['nextOrder'] = this.data['nextOrder'];
            // this.data['previousOrder'] = null;
            // this.data['nextOrder'] = null;
            globalThis.draggable = this.data;
            console.log(globalThis.draggable);
        });

        this.view.addEventListener('dragend', (event) => {
            event.target.classList.add('is-hidden');
        });

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let node = new PostpressItem(globalThis.draggable);
            node.data['nextOrder'] = this.data;
            node.data['previousOrder'] = this.data['previousOrder'];
            this.data['previousOrder'] = node.data;
            node.data['previousOrder']['nextOrder'] = node.data;
            if (event.target.classList.contains('column-order')) {
                event.target.parentNode.parentNode.insertBefore(node.view, event.target.parentNode);
                let orderEvent = new Event('orderMoved', {bubbles: true});
                // let valueChangedEvent = new CustomEvent('valuechanged', {bubbles: true, detail: {value: event.target.value}});
                node.view.dispatchEvent(orderEvent);
            };
            
        });
    }
}