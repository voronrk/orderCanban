export default class OrderItem {

    data = {};

    constructor(data) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns');
        // this.view.classList.add('is-gapless');
        this.view.draggable=true;
    }

}