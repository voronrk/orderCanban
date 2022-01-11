import OrderItem from "./OrderItem.js";

export default class HopeItem extends OrderItem {

    get duration() {
        return `<div class="column column-order is-size-7 has-text-centered">${this.data['duration']}</div>`
    }
    get orderNum() {
        return `<div class="column column-order is-size-7 has-text-centered">${this.data['orderNum']}</div>`
    }
    get customer() {
        return `<div class="column column-order is-size-7">${this.data['customer']}</div>`
    }
    get options() {
        return `<div class="column column-order is-4 is-size-7">${this.data['options']}</div>`
    }
    get day() {
        return `<div class="column column-order is-2 is-size-7">${this['date'] ? this['date'].toLocaleDateString() : ''}</div>`
    }

    render() {
        super.render();
        this.view.className = `columns order-row`;
        this.view.innerHTML = `${this.orderNum}${this.duration}${this.customer}`;
    }

    constructor(data) {
        super(data);
        this.render();
    }
}