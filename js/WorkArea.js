import Week from "./Week.js";

export default class WorkArea {

    render() {
       console.log('render');
       this.view.innerHTML = '';
       let currentOrder = this.firstOrder;
       do {
          let newWeek = new Week(this.beginDate, this.titles, currentOrder);
          this.view.appendChild(newWeek.view);
          currentOrder = newWeek.nextOrder;
       } while (currentOrder);
       return
    }
 
    constructor(beginDate, titles, firstOrder) {
       this.beginDate = beginDate;
       this.titles = titles;
       this.firstOrder = firstOrder;
       this.view = document.createElement('div');
       document.addEventListener('orderMoved', () => {
         console.log('event');
         this.render()
      });
       this.render();
    }
 };