import PostpressItem from "./PostpressItem.js";

export default class Day {

    workHoursCountMax = 8;

    get workHoursCount() {
        let duration = 0;
        if (this.daysOrders.length>0) {
            this.daysOrders.forEach((order) => {
                duration += +order.data['duration'];
            });
        };
        return duration;
    }

    daysOrders = [];

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

    renderDay() {
        let tableBody = document.createElement('div');
        this.daysOrders.forEach(order => {
            tableBody.appendChild(order.view);
        });
        return tableBody;
    };

    _tableBody(order) {
        this.daysOrders = this.orders.getOrdersByDate(this.date);
        return this.renderDay();
    };
    
    _tableBody_(order) {
        // console.log(this.orders.getOrdersByDate(this.date));
        let tableBody = document.createElement('div');
        if (order!=null) {
            do {
                if (!order['date']) {
                    order.update('date', new Date(this.date.toJSON()));
                };
                this.daysOrders.push(order);
                if (this.workHoursCount > this.workHoursCountMax) {
                    let continueOrderData = Object.assign({}, order.data);
                    let continueOrder = new PostpressItem(continueOrderData);
                    continueOrder.update('previousPart', order);
                    order.update('nextPart', continueOrder);
                    continueOrder.updateData('id', `${order.data['id']}-1`);
                    continueOrder.update('previousOrder', order);
                    continueOrder.update('nextOrder', order['nextOrder']);
                    order['nextOrder'].update('previousOrder', continueOrder);
                    order.update('nextOrder', continueOrder);
                    order.updateData('duration', order.data['duration']-(this.workHoursCount - this.workHoursCountMax));
                    continueOrder.updateData('duration', continueOrder.data['duration']-order.data['duration']);
                    this.orders.newOrder(continueOrder);
                };
                tableBody.appendChild(order.view);
                order = order['nextOrder'];
            } while ((order!=null) && (this.workHoursCount < this.workHoursCountMax));
            this.nextOrder = order;
        };
        return tableBody;
    };

    constructor(titles, dayOfWeek, date, order, orders) {
        this.dayOfWeek = dayOfWeek;
        this.date = date;
        this.titles = titles;
        this.orders = orders;

        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this._renderDate()}</div></div>`;

        {
        // let headAddOrder = document.createElement('div');
        // headAddOrder.classList.add('head','order-add');
        // headAddOrder.innerText = '+';
        // headAddOrder.addEventListener('click', ()=> {
        //     console.log(this);
            
        // });
        // this.view.appendChild(headAddOrder);
        }
        
        this.view.appendChild(this._tableHeader);
        this.tableBody = this.view.appendChild(this._tableBody(order));
        this.view.appendChild(this._tableFooter);

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