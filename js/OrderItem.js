import ContextMenu from "./contextMenu.js";
import {socket} from "./script.js";

export default class OrderItem {

    update_one(key, value, save=false){
        this[key] = value;
        this.updateData(key, value, save);
    };
    
    update(data, save=true){
        for (let key in data) {
            this[key] = data[key];
            if (save) {this.updateData(key, data[key])};
        };
        if (save) {this.save()};
        this.render();
        socket.send(this.data['id']);
    };

    updateData(key, value) {
        if ((key=='prev') || (key=='next') || (key=='prevPart') || (key=='nextPart')) {
            this.data[key] = value ? value.data['id'] : null;
        } else if (key=='date') {
            this.data[key] = value ? value.toDateString() : value;
        } else {
            this.data[key] = value;
        };
    };

    delete() {
        if (this['prev']) {
            this['prev'].update({next: this['next']});
        };
        if (this['next']) {
            this['next'].update({prev: this['prev']});
        };
        this.view.dispatchEvent(new CustomEvent('orderDeleted', {detail: this, bubbles: true}));
    };

    save() {
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
        if (this.data['status']) {this.view.classList.add(this.data['status']);}
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
            event.preventDefault();
            event.stopPropagation();
             if (event.target.classList.contains('column-order')) {
                dragging.delete();
                this.view.dispatchEvent(new CustomEvent('orderMoved', {detail: this, bubbles: true}));
            };
        });
    }
}