import Week from "./Week.js";

export default class WorkArea {

    render() {
       this.view.innerHTML = '';
       let currentOrder = this.firstOrder;
       do {
          let newWeek = new Week(this.beginDate, this.titles, currentOrder);
          this.view.appendChild(newWeek.view);
          currentOrder = newWeek.nextOrder;
       } while (currentOrder);
       return
    }
 
    constructor(beginDate, titles, orders) {
      console.log(orders['data']);
      this.beginDate = beginDate;
      this.titles = titles;
      this.firstOrder = orders.firstOrder();
      this.view = document.createElement('div');
      this.render();
      document.addEventListener('orderMoved', () => {
         this.render()
      });
    }
 };