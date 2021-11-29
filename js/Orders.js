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

    newOrder(order) {
        this.data.push(order);
        this.save();
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
        return this.data.filter(order => {return order['previousOrder']===null})[0];
    };

    lastOrder() {
        return this.data.filter(order => {return order['nextOrder']===null})[0];
    };
    
    getOrderById(id) {
        if (id) {
            return this.data.filter(order => {return order['id']==id})[0];
        } else {
            return null;
        }
    }

    save() {
        let dataForSave = [];
        this.data.forEach((item) => {
            let order = Object.assign({}, item);
            order['previousOrder'] = order['previousOrder'] ? order['previousOrder']['id'] : null;
            order['nextOrder'] = order['nextOrder'] ? order['nextOrder']['id'] : null;
            order['date'] = order['date'] ? String(order['date']) : null;
            dataForSave.push(order);
        });
        localStorage.setItem('orders', JSON.stringify(dataForSave));
    }

    constructor (data) {
        data.forEach(order => this.data.push(order));

        this.data.forEach(order => {
            order['previousOrder'] = this.getOrderById(order['previousOrder']);
            order['nextOrder'] = this.getOrderById(order['nextOrder']);
            order['date'] = typeof(order['date'])=='object' ? order['date'] : order['date'] ? new Date(order['date']) : null;
        });
    };
};