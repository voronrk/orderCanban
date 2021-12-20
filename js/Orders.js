import PostpressItem from "./PostpressItem.js";

export default class Orders {

    data = [];

    debug(){
        let order = Object.assign({}, this.head);
        let i=0;
        do {
            i++;
            console.log(order);
            order = order['next'] ? Object.assign({}, order['next']) : null;
            if (i>100) exit();
        } while (order!=null);
    }

    get head() {
        if (this.data.length>0) {
            return this.data.filter(order => {return order['prev']===null})[0];
        } else {
            return null
        };
    };

    get tail() {
        if (this.data.length>0) {
            return this.data.filter(order => {return order['next']===null})[0];
        } else {
            return null
        };
    };

    append(orderData) {
        if (this.tail) {
            let order = this.addOrder(orderData);
            order.update({
                next: null,
                prev: this.tail,
                date: this.date
            });
            order['prev'].update({next: order});
        } else {
            let order = this.addOrder(orderData);
            order.update({
                next: null,
                prev: null,
                date: this.date
            });
        };
    }

    addOrder(orderData) {
        let order = new this.itemClass(orderData);
        order.update({
            prev: this.getOrderById(order.data['prev']),
            next: this.getOrderById(order.data['next']),
            date: order.data['date'] ? new Date(order.data['date']) : null
        });
        if (order['prev']) {
            order['prev'].update({next: order});
        };
        if (order['next']) {
            order['next'].update({prev: order});
        };
        this.data.push(order);
        return order;
    }

    initOrder(orderData) {
        let order = new this.itemClass(orderData);
        order.update({date: order.data['date'] ? new Date(order.data['date']) : this.date ? new Date(this.date.toDateString()) : null}, false);
        this.data.push(order);
        return order;
    }

    setLinks() {
        this.data.forEach(orderData => {
            orderData.update({prev: orderData.data['prev'] ? this.getOrderById(orderData.data['prev']) : null}, false);
            orderData.update({next: (orderData.data['next']) ? this.getOrderById(orderData.data['next']) : null}, false);
        });
    }    

    insertBefore(order, before) {
        let updateCurrent = {
            prev: before['prev'],
            next: before,
            date: before['date']
        };
        order.update(updateCurrent);

        before.update({prev: order});
        if (order['prev']) {
            order['prev'].update({next: order});
        };
    }

    insertAfter(order, after) {
        if (this.tail) {
            let updateCurrent = {
                prev: after,
                next: after['next'],
                date: after['date']
            };
            order.update(updateCurrent);

            after.update({next: order});
            if (order['next']) {
                order['next'].update({pre: order});
            };
        } else {
            let updateCurrent = {
                prev: null,
                next: null,
                date: this.date
            };
            order.update(updateCurrent);
        };
    }

    getOrderById(id) {
        if (id) {
            return this.data.filter(order => {return order.data['id']==id})[0];
        } else {
            return null;
        }
    }

    getOrdersByDate(date) {
        if (date) {
            return this.data.filter(order => {return order['date'].toDateString()==date.toDateString()});
        } else {
            return this.data.filter(order => {return order['date']==null});
        }
    };

    constructor (data = [], date, itemClass = PostpressItem) {
        this.date = date;
        this.itemClass = itemClass;
        if (data) {
            data.forEach(orderData => this.initOrder(orderData));
        };            
    };
};