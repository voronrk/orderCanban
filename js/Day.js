import PostpressItem from "./PostpressItem.js";

export default class Day {

    workHoursCountMax = 9;

    get workHoursCount() {
        let duration = 0;
        if (this.orders.length>0) {
            this.orders.forEach((order) => {
                duration += +order['duration'];
            });
        };
        return duration;
    }

    orders = [];

    _renderDate() {
        let day = this.date.getDate()<10 ? `0${this.date.getDate()}` : this.date.getDate();
        let mounth = this.date.getMonth()<9 ? `0${this.date.getMonth()+1}` : this.date.getMonth()+1;
        let year = this.date.getFullYear()
        return `${day}.${mounth}.${year}`;
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
            <div class="column column-order has-text-centered is-size-7 is-6">${this.titles[3]}</div>
        `;
        return tableHeader;
    }

    _tableBody(order) {
        let tableBody = document.createElement('div');
        if (order!=null) {
            do {
                this.orders.push(order);
                if (this.workHoursCount > this.workHoursCountMax) {
                    let continueOrder = Object.assign({}, order);
                    continueOrder['previousOrder'] = order;
                    continueOrder['nextOrder'] = order['nextOrder'];
                    order['nextOrder']['previousOrder'] = continueOrder;
                    order['nextOrder'] = continueOrder;
                    order['duration'] -= (this.workHoursCount - this.workHoursCountMax);
                    continueOrder['duration'] -= order['duration'];
                };
                let newOrder = new PostpressItem(order);
                tableBody.appendChild(newOrder.view);
                order = order['nextOrder'];
            } while ((order!=null) && (this.workHoursCount < this.workHoursCountMax));
            this.nextOrder = order;
        };
        return tableBody;
    }

    constructor(titles, dayOfWeek, date, order) {
        this.dayOfWeek = dayOfWeek;
        this.date = date;
        this.titles = titles;

        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this._renderDate()}</div></div>`;

        // let headAddOrder = document.createElement('div');
        // headAddOrder.classList.add('head','order-add');
        // headAddOrder.innerText = '+';
        // headAddOrder.addEventListener('click', ()=> {
        //     console.log(this);
            
        // });
        // this.view.appendChild(headAddOrder);
        
        this.view.appendChild(this._tableHeader);
        this.tableBody = this.view.appendChild(this._tableBody(order));
        this.view.appendChild(this._tableFooter);

        this.view.addEventListener('dragover', (event)=> {
            event.preventDefault();
        },false);

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            let node = new PostpressItem(JSON.parse(localStorage.getItem('dragging')));
            if (event.target.closest('.column-day')) {
                this.tableBody.appendChild(node.view);
                localStorage.removeItem('dragging');
            };
        });

        // this.view.addEventListener('dragenter', (event) => {
        //     console.log('enter');
        // })
    };
}