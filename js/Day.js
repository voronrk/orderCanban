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

    renderDate() {
        let day = this.date.getDate()<10 ? `0${this.date.getDate()}` : this.date.getDate();
        let mounth = this.date.getMonth()<9 ? `0${this.date.getMonth()+1}` : this.date.getMonth()+1;
        let year = this.date.getFullYear()
        return `${day}.${mounth}.${year}`;
    }

    constructor(titles, dayOfWeek, date, order) {
        this.dayOfWeek = dayOfWeek;
        this.date = date;

        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this.renderDate()}</div></div>`;

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

        if (order!=null) {
            do {
                this.orders.push(order);
                if (this.workHoursCount > this.workHoursCountMax) {
                    console.log('yea');
                    let continueOrder = Object.assign({}, order);
                    continueOrder['previousOrder'] = order;
                    continueOrder['nextOrder'] = order['nextOrder'];
                    order['nextOrder']['previousOrder'] = continueOrder;
                    order['nextOrder'] = continueOrder;
                    order['duration'] -= (this.workHoursCount - this.workHoursCountMax);
                    continueOrder['duration'] -= order['duration'];
                    // debugger;
                    // // this.workHoursCount = this.workHoursCountMax;
                };
                console.log(this.workHoursCount);
                let newOrder = new PostpressItem(order);
                this.view.appendChild(newOrder.view);
                order = order['nextOrder'];
            } while ((order!=null) && (this.workHoursCount < this.workHoursCountMax));
            this.nextOrder = order;
            console.log(this.orders);
        };

        let tableFooter = document.createElement('div');
        tableFooter.classList.add('columns','is-gapless','has-text-weight-bold');
        tableFooter.innerHTML = `
            <div class="column column-order has-text-centered is-size-6 is-1"></div>
            <div class="column column-order has-text-centered is-size-6 is-1">${this.workHoursCount}</div>
            <div class="column column-order has-text-centered is-size-6 is-10">${this.workHoursCountMax} часов</div>
        `;
        this.view.appendChild(tableFooter);

        this.view.addEventListener('dragover', (event)=> {
            event.preventDefault();
        },false);

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            let node = document.querySelector('#dragging');
            node.id = '';
            if (event.target.classList.contains('column-day')) {
                this.view.appendChild(node);
            };            
        })
    };
}