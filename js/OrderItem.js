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
        // this.updateData(key, value);
        this.render();
    };

    updateData(key, value) {
        if ((key=='previousOrder') || (key=='nextOrder') || (key=='previousPart') || (key=='nextPart')) {
            this.data[key] = value ? value.data['id'] : null;
        } else if (key=='date') {
            this.data[key] = value ? value.toJSON() : value;
        } else {
            this.data[key] = value;
        };
        this.render();
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
            globalThis.draggable = this;
        });

        this.view.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });

        // this.view.addEventListener('dragenter', (event) => {
        //     let placeholder = document.createElement('div');
        //     placeholder.classList.add('placeholder');
        //     console.log(placeholder);
        //     event.target.parentNode.insertBefore(placeholder, event.target);
        // });

        this.view.addEventListener('drop', (event) => {
             if (event.target.classList.contains('column-order')) {
                event.preventDefault();
                event.stopPropagation();
                draggable['previousOrder'].update('nextOrder', draggable['nextOrder']);
                draggable['nextOrder'].update('previousOrder', draggable['previousOrder']);
                draggable.update('nextOrder', this);
                draggable.update('previousOrder', this['previousOrder']);
                this.update('previousOrder', draggable);
                draggable['previousOrder'].update('nextOrder', draggable);
                let orderEvent = new Event('orderMoved', {bubbles: true});
                draggable.view.dispatchEvent(orderEvent);
                draggable.view.classList.remove('dragging');
            };
        });
    }
}