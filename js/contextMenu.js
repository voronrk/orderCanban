import { dateForSave, dataForSendToSocket } from "./functions.js";
import { socket, user } from "./socket.js";

export default class ContextMenu {

    get items() {
        const items = document.createElement('div');
        items.innerHTML = `
            <div class="panel-block" id='reject'>Отменить операцию</div>
            <div class="panel-block" id='slice'>Разделить заказ</div>
            <div class="panel-block" id='in-progress'>В работе</div>
            <div class="panel-block" id='complete'>Готов</div>
            <div class="panel-block" id='warning'>Проблема</div>
        `;
        return items;
    }

    _render(x,y) {
        this.view = document.createElement('div');
        this.view.classList.add('context-menu', 'panel', 'is-small');
        this.view.appendChild(this.items);
        this.view.style.left = `${x}px`;
        this.view.style.top = `${y}px`;
    }

    constructor (order, x, y) {
        this.order = order;
        this._render(x,y);

        this.view.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.view.classList.add('is-hidden');
            this.view.parentNode.classList.remove('clicked');
            if (e.target.id=='reject') {
                globalThis.dragging = this.order;
                this.order.view.dispatchEvent(new CustomEvent('orderRejected', {bubbles: true}));
            };
            if (e.target.id=='slice') {
                // globalThis.dragging = this.order;
                // this.order.view.dispatchEvent(new CustomEvent('orderRejected', {bubbles: true}));
                console.log('slice');
            };
            if (e.target.id=='in-progress') {
                this.view.parentNode.classList.add('in-progress');
                this.order.update({'status': 'in-progress'});
                socket.send(dataForSendToSocket(user, dateForSave(this.order.date)));
            };
            if (e.target.id=='complete') {
                this.view.parentNode.classList.add('complete');
                this.order.update({'status': 'complete'});
                socket.send(dataForSendToSocket(user, dateForSave(this.order.date)));
            };
            if (e.target.id=='warning') {
                this.view.parentNode.classList.add('warning');
                this.order.update({'status': 'warning'});
                socket.send(dataForSendToSocket(user, dateForSave(this.order.date)));
            };
        });
    }
}