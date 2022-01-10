import Orders from "./Orders.js";
import { dateForSave } from "./functions.js";

export default class Day {

    workHoursCountMax = 8;

    orders = [];

    workHoursCountMaxField() {
        let field = document.createElement('div');
        field.classList.add('column', 'column-order', 'has-text-centered', 'is-size-6', 'is-10');
        field.innerText = `${this.workHoursCountMax} часов`;
        field.addEventListener('click', (e) => {
            field.innerHTML = '';
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = this.workHoursCountMax;
            field.appendChild(inputField);
            inputField.focus();
            e.stopPropagation();
            inputField.addEventListener('blur', (e) => {
                this.workHoursCountMax = inputField.value;
                this._saveMaxHours();
                this._render();
                e.stopPropagation();
            });
        });
        return field;
    }

    get workHoursCount() {
        let duration = 0;
        if (this.orders.data.length>0) {
            this.orders.data.forEach((order) => {
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
            <div class="column column-order has-text-centered is-size-6 is-1 ${this.workHoursCount>this.workHoursCountMax ? 'has-text-danger' : 'has-text-success'}">${this.workHoursCount}</div>
        `;
        tableFooter.appendChild(this.workHoursCountMaxField());
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
        let currentOrder = this.orders.head;
        if (currentOrder) {
            do {
                tableBody.appendChild(currentOrder.view);
                currentOrder = currentOrder['next'];
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
            //    date: this.date.toDateString(),
               date: dateForSave(this.date),
               machine: machine
            })
           })
           .then((res) => res.json())
           .then ((data) => {
                if (data['maxhours']) {
                    this.workHoursCountMax = data['maxhours']
                } else {
                    this._saveMaxHours();
                };
                this.orders = new Orders(data['planned'], this.date);
                this.orders.setLinks();
                this._render();
        })
    }

    _saveMaxHours() {
        const data = {
            // date: this.date.toDateString(),
            date: dateForSave(this.date),
            machine: this.machine,
            hours: this.workHoursCountMax
        };
        fetch('/back/saveMaxHours.php', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data,
            })
            })
            .then((res) => res.json())
            .then ((data) => {
                //  console.log(data);
         })
    }

    constructor(titles, dayOfWeek, date, orders, machine) {
        this.dayOfWeek = dayOfWeek;
        this.date = new Date(date);
        this.titles = titles;
        this.machine = machine;
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
            dragging.delete();
            let order = this.orders.initOrder(dragging.data);
            this.orders.insertBefore(order, e.detail);
            this._render()
        });

        this.view.addEventListener('orderDeleted', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.orders.data.splice(this.orders.data.indexOf(e.detail),1);
            this._render();
         });

        this.view.addEventListener('dragover', (event)=> {
            event.preventDefault();
        },false);

        this.view.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragging.delete();
            let order = this.orders.initOrder(dragging.data);
            this.orders.insertAfter(order, this.orders.tail);
            this._render();
        });
    };
}