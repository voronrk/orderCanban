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
            // console.log(this.data);
            // event.target.id = 'dragging';
            // event.dataTransfer.setData("text", event.target.id);
            // setTimeout(() => event.target.classList.add('is-hidden'), 0);
            this.data['previousOrder']['nextOrder'] = this.data['nextOrder'];
            this.data['previousOrder'] = null;
            this.data['nextOrder'] = null;
            localStorage.setItem('dragging', JSON.stringify(this.data));
        });

        this.view.addEventListener('dragend', (event) => {
            event.target.classList.add('is-hidden');
            console.log(event);
        });

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let node = new PostpressItem(JSON.parse(localStorage.getItem('dragging')));
            node.data['nextOrder'] = this.data;
            node.data['previousOrder'] = this.data['previousOrder'];
            this.data['previousOrder'] = node.data;
            node.data['previousOrder']['nextOrder'] = node.data;
            if (event.target.classList.contains('column-order')) {
                event.target.parentNode.parentNode.insertBefore(node.view, event.target.parentNode);
                localStorage.removeItem('dragging');
            };
            
        });
    }
}