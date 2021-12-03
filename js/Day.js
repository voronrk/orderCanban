import Orders from "./Orders.js";

export default class Day {

    workHoursCountMax = 8;

    orders = [];

    get workHoursCount() {
        let duration = 0;
        if (this.orders.length>0) {
            this.orders.forEach((order) => {
                duration += +order.data['duration'];
            });
        };
        return duration;
    }

    _renderDate() {
        return this.date.toLocaleDateString();
    }

    get _tableFooter() {
        let tableFooter = document.createElement('div');
        tableFooter.classList.add('columns','is-gapless','has-text-weight-bold');
        tableFooter.innerHTML = `
            <div class="column column-order has-text-centered is-size-6 is-1"></div>
            <div class="column column-order has-text-centered is-size-6 is-1">${this.workHoursCount}</div>
            <div class="column column-order has-text-centered is-size-6 is-10">${this.workHoursCountMax} часов</div>
        `;
        return tableFooter;
    }

    get _tableHeader() {
        let tableHeader = document.createElement('div');
        tableHeader.classList.add('columns','is-gapless','has-text-weight-bold');
        tableHeader.innerHTML = `
            <div class="column column-order has-text-centered is-size-7 is-1">${this.titles[0]}</div>
            <div class="column column-order has-text-centered is-size-7 is-1">${this.titles[1]}</div>
            <div class="column column-order has-text-centered is-size-7 is-4">${this.titles[2]}</div>
            <div class="column column-order has-text-centered is-size-7 is-4">${this.titles[3]}</div>
            <div class="column column-order has-text-centered is-size-7 is-2">${this.titles[4]}</div>
        `;
        return tableHeader;
    }

    _tableBody() {
        let tableBody = document.createElement('div');
        for (let i in this.orders.data) {
            tableBody.appendChild(this.orders.data[i].view);
        };
        return tableBody;
    };

    _render() {
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this._renderDate()}</div></div>`;
        this.view.appendChild(this._tableHeader);
        this.tableBody = this.view.appendChild(this._tableBody());
        this.view.appendChild(this._tableFooter);
    }

    setOrders(orders) {
        this.orders = new Orders();
        orders.getOrdersByDate(this.date).forEach(order => {
            this.orders.addOrder(order.data);
        });
        this._render();
    }

    constructor(titles, dayOfWeek, date, orders) {
        this.dayOfWeek = dayOfWeek;
        this.date = date;
        this.titles = titles;
        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');

        this.setOrders(orders);

        this.view.addEventListener('dragover', (event)=> {
            event.preventDefault();
        },false);

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            if (event.target.closest('.column-day')) {
                


                let orderEvent = new Event('orderMoved', {bubbles: true});
                node.view.dispatchEvent(orderEvent);
            };

            // let node = new PostpressItem(globalThis.draggable);
            // if (event.target.closest('.column-day')) {
            //     this.tableBody.appendChild(node.view);
            //     let orderEvent = new Event('orderMoved', {bubbles: true});
            //     node.view.dispatchEvent(orderEvent);
            // };
        });

        // this.view.addEventListener('dragenter', (event) => {
        //     console.log('enter');
        // })
    };
}