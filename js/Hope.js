import Orders from "./Orders.js";
import HopeItem from "./HopeItem.js";

export default class Hope {

    _render() {
        this.view.innerHTML = '';
        this.orders.data.forEach(item => {
            this.view.appendChild(item.view);
        });
    }

    constructor(orders) {
        this.orders = new Orders(orders, null, HopeItem);
        this.view = document.createElement('div');
        this._render();

        this.view.addEventListener('orderDeleted', (e) => {
            this.orders.data.splice(this.orders.data.indexOf(e.detail),1);
            this._render()
            e.preventDefault();
            e.stopPropagation()
         });
    }
}