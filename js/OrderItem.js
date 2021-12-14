import ContextMenu from "./contextMenu.js";

export default class OrderItem {

    update_one(key, value, save=false){
        this[key] = value;
        this.updateData(key, value, save);
    };
    
    update(data){
        for (let key in data) {
            this[key] = data[key];
            this.updateData(key, data[key]);
        };
        this.render();
        this.save();
    };

    updateData(key, value) {
        if ((key=='prev') || (key=='next') || (key=='prevPart') || (key=='nextPart')) {
            this.data[key] = value ? value.data['id'] : null;
        } else if (key=='date') {
            this.data[key] = value ? value.toDateString() : value;
        } else {
            this.data[key] = value;
        };
        // this.render();
        // if (save) this.save();
    };

    delete() {
        if (this['prev']) {
            this['prev'].update({next: this['next']});
        };
        if (this['next']) {
            this['next'].update({prev: this['prev']});
        };
        let updateCurrent = {
            prev: null,
            next: null,
            date: null
        };
        this.update(updateCurrent);
        this.view.dispatchEvent(new CustomEvent('orderDeleted', {detail: this, bubbles: true}));
    };

    save() {
        // console.log(this.data);
        fetch('/back/updateData.php', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: this.data,
             })
            })
            .then((res) => res.json())
            .then ((data) => {
                //  console.log(data);
         })
    }

    constructor(data={}) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','order-row');
        this.view.draggable=true;

        //=============for debug=================
        this.view.addEventListener('click', () => console.log(this));
        //=======================================

        this.view.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const menu = new ContextMenu(this, e.x, e.y);
            this.view.classList.add('clicked');
            this.view.appendChild(menu.view);
        })

        this.view.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragging');
            globalThis.dragging = this;
        });

        this.view.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragging');
        });

        this.view.addEventListener('drop', (event) => {
             if (event.target.classList.contains('column-order')) {
                this.view.dispatchEvent(new CustomEvent('orderMoved', {detail: this, bubbles: true}));
                event.preventDefault();
                event.stopPropagation();
            };
        });
    }
}