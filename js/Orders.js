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

    // async getData() {
    //     const res = await fetch('/js/testOrders.json');
    //     const data = await res.json();
    //     return data;
    // }

    constructor (data) {
        for (let i in data) {
            this.data.push(data[i]);
            if (i == 0) {
            this.data[i]['previousOrder'] = null;
            } else {
            this.data[i]['previousOrder'] = this.data[i-1];
            this.data[i-1]['nextOrder']=this.data[i];
            };
        };
        console.log(this.data);
        // this.debug(this.firstOrder());
    };
    // constructor (){
    //     this.getData().then(data => {
    //         for (let i in data) {
    //             this.data.push(data[i]);
    //             if (i == 0) {
    //             this.data[i]['previousOrder'] = null;
    //             } else {
    //             this.data[i]['previousOrder'] = this.data[i-1];
    //             this.data[i-1]['nextOrder']=this.data[i];
    //             };
    //         };
    //         console.log(this.data);
    //         // this.debug(this.firstOrder());
    //     });
    // };
};