import Week from "./Week.js";

export default class WorkArea {

    render() {
       this.view.innerHTML = '';
       let currentOrder = this.orders.firstOrder();
       let currentDate = new Date();
       currentDate.setDate(this.startDate.getDate());
       do {
            let newWeek = new Week(currentDate, this.titles, currentOrder, this.orders);
            this.view.appendChild(newWeek.view);
            currentOrder = newWeek.nextOrder;
            currentDate.setDate(newWeek.nextDate.getDate());
       } while (currentOrder);
       return
    }
 
    constructor(startDate, titles, orders) {
      this.startDate = startDate;
      this.titles = titles;
      this.orders = orders;
      this.view = document.createElement('div');
      this.render();
      document.addEventListener('orderMoved', () => {
         this.render()
      });
    }
 };