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

    update(key, value){
        this[key] = value;
        if ((key=='previousOrder') || (key=='nextOrder')) {
            this.data[key] = value ? value.data['id'] : null;
        };
        if (key=='date') {
            this.data[key] = value ? value.toJSON() : value;
        };        
    };
    updateData(key, value) {
        this.data[key] = value;
    };

    constructor(data={}) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','order-row');
        this.view.draggable=true;

        //=============for debug=================
        this.view.addEventListener('click', ()=> console.log(this));
        //=======================================

        this.view.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragging');
            this.data['previousOrder']['nextOrder'] = this.data['nextOrder'];
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
                node.view.dispatchEvent(orderEvent);
            };
        });
    }
}