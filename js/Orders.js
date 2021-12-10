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
            let order = this.addOrder(orderData, false);
            order.update('next', null);
            order.update('prev', this.tail,true);
            order['prev'].update('next', order,true);
            return order;
        } else {
            let order = this.addOrder(orderData, false);
            order.update('next', null);
            order.update('prev', null, true);
            return order;
        };
    }

    addOrder(orderData, save=false) {
        let order = new this.itemClass(orderData);
        order.update("prev", this.getOrderById(order.data['prev']));
        order.update("next", this.getOrderById(order.data['next']));
        order.update("date", order.data['date'] ? new Date(order.data['date']) : null, save);
        if (order['prev']) {
            order['prev'].update('next', order, true);
        };
        if (order['next']) {
            order['next'].update('prev', order, true);
        };
        this.data.push(order);
        return order;
    }

    initOrder(orderData) {
        let order = new this.itemClass(orderData);
        order.update("date", order.data['date'] ? new Date(order.data['date']) : null);
        this.data.push(order);
    }

    setLinks() {
        this.data.forEach(orderData => {
            orderData.update('prev', this.getOrderById(orderData.data['prev']));
            orderData.update('next', this.getOrderById(orderData.data['next']));
        });
    }    

    moveBefore(order, before) {
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

    moveAfter(order, after) {
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

    insertAfter(order, after) {
        order['next'] = after['next'];
        order['prev'] = after;
        after['next'] = order;
        if (order['next']) {
            order['next']['prev'] = order;
        };
    }

    insertBefore(order, before) {
        if (order['prev']) {
            order['prev'].update('next', order['next'],true);
        };
        if (order['next']) {
            order['next'].update('prev', order['prev'],true);
        };
        order.update('next', before);
        order.update('prev', before['prev'], true);
        before.update('prev', order,true);
        if (order['prev']) {
            order['prev'].update('next', order, true);
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
            return this.data.filter(order => {return order['date'].toLocaleDateString()==date.toLocaleDateString()});
        } else {
            return this.data.filter(order => {return order['date']==null});
        }
    };

    getOrdersByDateRange(date) {
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