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
            console.log(this.tail);
            let order = this.addOrder(orderData, false);
            order.update({
                next: null,
                prev: this.tail
            });
            order['prev'].update({next: order});
            return order;
        } else {
            let order = this.addOrder(orderData, false);
            order.update({
                next: null,
                prev: null
            });
            return order;
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
        order.update({date: order.data['date'] ? new Date(order.data['date']) : null});
        this.data.push(order);
    }

    setLinks() {
        this.data.forEach(orderData => {
            orderData.update({prev: this.getOrderById(orderData.data['prev'])});
            orderData.update({next: this.getOrderById(orderData.data['next'])});
        });
    }    

    moveBefore_DEPRECATED(order, before) {
        order['prev']['next'] = order['next'];
        order['next']['prev'] = order['prev'];

        order['next'] = before;
        order['prev'] = before['prev'];
        before['prev'] = order;
        if (order['prev']) {
            order['prev']['next'] = order;
        };
        // console.log(this.data);
    }

    moveAfter_DEPRECATED(order, after) {
        order['prev']['next'] = order['next'];
        order['next']['prev'] = order['prev'];

        order['next'] = after['next'];
        order['prev'] = after;
        after['next'] = order;
        if (order['next']) {
            order['next']['prev'] = order;
        };
        // console.log(this.data);
    }

    insertAfter_DEPRECATED(order, after) {
        order['next'] = after['next'];
        order['prev'] = after;
        after['next'] = order;
        if (order['next']) {
            order['next']['prev'] = order;
        };
    }

    insertBefore(order, before) {
        // if (order['prev']) {
        //     order['prev'].update({next: order['next']});
        // };
        // if (order['next']) {
        //     order['next'].update({prev: order['prev']});
        // };
        let updateCurrent = {
            prev: before['prev'],
            next: before,
        };
        order.update(updateCurrent);

        before.update({prev: order});
        if (order['prev']) {
            order['prev'].update({next: order});
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

    getOrdersByDateRange_NOT_USED(date) {
        // if (date) {
        //     return this.data.filter(order => {return order['date']>=date});
        // } else {
        //     return this.data.filter(order => {return order['date']==null});
        // }
    };

    save_DEPRECATED() {
        let dataForSave = [];
        this.data.forEach((item) => {
            dataForSave.push(item.data);
        });
        console.log(dataForSave);
        localStorage.setItem('orders', JSON.stringify(dataForSave));
    }

    constructor (data = [], itemClass = PostpressItem, date) {
        this.itemClass = itemClass;
        if (data) {
            data.forEach(orderData => this.initOrder(orderData));
        };            
    };
};