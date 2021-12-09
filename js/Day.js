import Orders from "./Orders.js";

export default class Day {

    workHoursCountMax = 8;

    orders = [];

    get workHoursCount() {
        let duration = 0;
        if (this.orders.data.length>0) {
            this.orders.data.forEach((order) => {
                duration += +order.data['duration'];
            });
        };
        return duration;
    }

    // insertBefore(order, before) {
    //     if (order['previousOrder']) {
    //         order['previousOrder'].update('nextOrder', order['nextOrder']);
    //     };
    //     if (order['nextOrder']) {
    //         order['nextOrder'].update('previousOrder', order['previousOrder']);
    //     };
    //     order.update('nextOrder', before);
    //     order.update('previousOrder', before['previousOrder']);
    //     before.update('previousOrder', order);
    //     if (order['previousOrder']) {
    //         order['previousOrder'].update('nextOrder', order);
    //     };
    // }

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
        let currentOrder = this.orders.firstOrder();
        if (currentOrder) {
            do {
                tableBody.appendChild(currentOrder.view);
                currentOrder = currentOrder['nextOrder'];
            } while (currentOrder);
        };        
        return tableBody;
    };

    _render() {
        this.view.innerHTML = `<div class="head"><div>${this.dayOfWeek}</div><div>${this._renderDate()}</div></div>`;
        this.view.appendChild(this._tableHeader);
        this.tableBody = this.view.appendChild(this._tableBody());
        this.view.appendChild(this._tableFooter);
    }

    setOrders(machine) {
        fetch('/back/getData.php', {
           method: 'POST', 
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               date: this.date.toDateString(),
               machine: machine
            })
           })
           .then((res) => res.json())
           .then ((data) => {
                this.orders = new Orders(data['planned']);
                this._render();
        })
    }

    constructor(titles, dayOfWeek, date, orders, machine) {
        this.dayOfWeek = dayOfWeek;
        this.date = new Date(date);
        this.titles = titles;
        this.view = document.createElement('div');
        this.view.classList.add('column', 'column-day');

        this.setOrders(machine);

        //=========================debug=========================
        this.view.addEventListener('click', (e) => {
            if (e.target.classList.contains("head")) {
                console.log(this);
            }
        })
        //=======================================================

        this.view.addEventListener('orderMoved', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragging.update('date', this.date);
            let order = this.orders.addOrder(dragging.data);
            this.orders.insertBefore(order, e.detail);
            order.save();
            order['previousOrder'].save();
            order['nextOrder'].save();
            dragging.delete();
            this._render()
        });

        this.view.addEventListener('orderDeleted', (e) => {
            this.orders.data.splice(this.orders.data.indexOf(e.detail),1);
            this._render()
            e.preventDefault();
            e.stopPropagation()
         });

        this.view.addEventListener('dragover', (event)=> {
            event.preventDefault();
        },false);

        this.view.addEventListener('drop', (event) => {
            event.preventDefault();
            dragging.data['date'] = this.date.toDateString();
            this.orders.insertAsLast(dragging.data);
            dragging.delete();
            this._render();
        });
    };
}