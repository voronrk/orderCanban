import PostpressItem from "./PostpressItem.js";

export default class Orders {

    data = [];

    debug(firstOrder){
        let order = Object.assign({}, firstOrder);
        let i=0;
        do {
            i++;
            console.log(order);
            order = order['nextOrder'] ? Object.assign({}, order['nextOrder']) : null;
            if (i>100) exit();
        } while (order!=null);
    }

    addOrder(orderData) {
        let order = new PostpressItem(orderData);
        order.update("previousOrder", this.getOrderById(order.data['previousOrder']));
        order.update("nextOrder", this.getOrderById(order.data['nextOrder']));
        order.update("date", order.data['date'] ? new Date(order.data['date']) : null);
        if (this.lastOrder()) {
            order.update('previousOrder', this.lastOrder());
            order['previousOrder'].update('nextOrder', order);
        };
        this.data.push(order);
    }

    moveBefore(order, before) {
        order['previousOrder']['nextOrder'] = order['nextOrder'];
        order['nextOrder']['previousOrder'] = order['previousOrder'];

        order['nextOrder'] = before;
        order['previousOrder'] = before['previousOrder'];
        before['previousOrder'] = order;
        if (order['previousOrder']) {
            order['previousOrder']['nextOrder'] = order;
        };
        // console.log(this.data);
    }

    moveAfter(order, after) {
        order['previousOrder']['nextOrder'] = order['nextOrder'];
        order['nextOrder']['previousOrder'] = order['previousOrder'];

        order['nextOrder'] = after['nextOrder'];
        order['previousOrder'] = after;
        after['nextOrder'] = order;
        if (order['nextOrder']) {
            order['nextOrder']['previousOrder'] = order;
        };
        // console.log(this.data);
    }

    insertAfter(order, after) {
        order['nextOrder'] = after['nextOrder'];
        order['previousOrder'] = after;
        after['nextOrder'] = order;
        if (order['nextOrder']) {
            order['nextOrder']['previousOrder'] = order;
        };
        // console.log(this.data);
    }

    insertBefore(order, before) {
        order['nextOrder'] = before;
        order['previousOrder'] = before['previousOrder'];
        before['previousOrder'] = order;
        if (order['previousOrder']) {
            order['previousOrder']['nextOrder'] = order;
        };
        // console.log(this.data);
    }

    firstOrder() {
        if (this.data.length>0) {
            return this.data.filter(order => {return order['previousOrder']===null})[0];
        } else {
            return null
        };
    };

    lastOrder() {
        if (this.data.length>0) {
            return this.data.filter(order => {return order['nextOrder']===null})[0];
        } else {
            return null
        };
    };
    
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

    save() {
        let dataForSave = [];
        this.data.forEach((item) => {
            dataForSave.push(item.data);
        });
        console.log(dataForSave);
        localStorage.setItem('orders', JSON.stringify(dataForSave));
    }

    constructor (data = []) {
        if (data) {
            data.forEach(orderData => this.addOrder(orderData));
        };
    };
};