import Week from "./Week.js";

export default class WorkArea {

    render() {
       this.view.innerHTML = '';
       let currentOrder = this.orders.firstOrder();
      //  let currentOrder = this.firstOrder;
       do {
          let newWeek = new Week(this.beginDate, this.titles, currentOrder, this.orders);
          this.view.appendChild(newWeek.view);
          currentOrder = newWeek.nextOrder;
       } while (currentOrder);
       return
    }
 
    constructor(beginDate, titles, orders) {
      this.beginDate = beginDate;
      this.titles = titles;
      // this.firstOrder = orders.firstOrder();
      this.orders = orders;
      this.view = document.createElement('div');
      this.render();
      document.addEventListener('orderMoved', () => {
         this.render()
      });
    }
 };