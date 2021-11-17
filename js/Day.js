import PostpressItem from "./PostressItem.js";

export default class Day {

    constructor(titles, dayOfWeek, date, orders=[]) {
        this.orders = orders;
        this.dayOfWeek = dayOfWeek;
        this.date = date;
        this.orders = orders;

        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this.date}</div></div>`;

        let headAddOrder = document.createElement('div');
        headAddOrder.classList.add('head','order-add');
        headAddOrder.innerText = '+';
        headAddOrder.addEventListener('click', ()=> {
            console.log(this);
            
        });
        this.view.appendChild(headAddOrder);

        let headTableHeader = document.createElement('div');
        headTableHeader.classList.add('columns','is-gapless','has-text-weight-bold');
        headTableHeader.innerHTML = `
            <div class="column column-order has-text-centered is-size-7 is-1">${titles[0]}</div>
            <div class="column column-order has-text-centered is-size-7 is-1">${titles[1]}</div>
            <div class="column column-order has-text-centered is-size-7 is-4">${titles[2]}</div>
            <div class="column column-order has-text-centered is-size-7 is-6">${titles[3]}</div>
        `;
        this.view.appendChild(headTableHeader);

        this.orders.forEach(order => {
            let newOrder = new PostpressItem(order);
            this.view.appendChild(newOrder.view);
        });
    };
}