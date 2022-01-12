import Orders from "./Orders.js";
import HopeItem from "./HopeItem.js";
import { socket, user } from "./socket.js";
import {dataForSendToSocket} from "./functions.js";

export default class Hope {

    _render() {
        this.view.innerHTML = '';
        this.orders.data.forEach(item => {
            this.view.appendChild(item.view);
        });
    }

    _setOrders() {
        fetch('/back/getData.php', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                machine: this.machine
            })
            })
            .then((res) => res.json())
            .then ((data) => {
                this.orders = new Orders(data['notplanned'], null, HopeItem);
                this._render();
            });
    }

    _reload() {
        setTimeout(() => this._setOrders(), 500);
    }

    constructor(machine) {
        this.machine = machine;
        this.view = document.createElement('div');
        this._setOrders();

        this.view.addEventListener('orderDeleted', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.orders.data.splice(this.orders.data.indexOf(e.detail),1);
            this._render();
            socket.send(dataForSendToSocket(user, 0));
        });

        this.view.addEventListener('needReload', (e) => {
            e.preventDefault();
            this._reload();
        });
    }
}