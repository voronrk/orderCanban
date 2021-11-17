import OrderItem from "./OrderItem.js";

export default class PostpressItem extends OrderItem {

    get duration() {
        return `<div class="column column-order is-1 is-size-7 has-text-centered">${this.data['duration']}</div>`
    }
    get orderNum() {
        return `<div class="column column-order is-1 is-size-7 has-text-centered">${this.data['orderNum']}</div>`
    }
    get customer() {
        return `<div class="column column-order is-4 is-size-7">${this.data['customer']}</div>`
    }
    get options() {
        return `<div class="column column-order is-6 is-size-7">${this.data['options']}</div>`
    }

    constructor(data) {
        super(data);
        this.view.innerHTML = `${this.duration}${this.orderNum}${this.customer}${this.options}`;

        this.view.addEventListener('dragenter', () => {
            console.log(this.view);
        })
    }
}