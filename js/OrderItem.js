export default class OrderItem {

    getSibling_DEPRECATED (id) {
        for (let item of this.data) {
            if (item['id']===id) {
                return item
            };
        };
        return null;
    };

    update(key, value){
        this[key] = value;
        this.updateData(key, value);
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

    insertBefore(order, before) {
        if (order['previousOrder']) {
            order['previousOrder'].update('nextOrder', order['nextOrder']);
        };
        if (order['nextOrder']) {
            order['nextOrder'].update('previousOrder', order['previousOrder']);
        };
        order.update('nextOrder', before);
        order.update('previousOrder', before['previousOrder']);
        before.update('previousOrder', order);
        if (order['previousOrder']) {
            order['previousOrder'].update('nextOrder', order);
        };
    }

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
            globalThis.dragging = this;
            // console.log(globalThis.dragging);
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
                // this.insertBefore(dragging, this);
                this.view.dispatchEvent(new Event('orderMoved', {bubbles: true}));
                event.preventDefault();
                event.stopPropagation();
            };
        });
    }
}