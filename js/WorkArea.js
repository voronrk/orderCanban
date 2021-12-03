import Week from "./Week.js";
import Orders from "./Orders.js";

export default class WorkArea {

   weeks = [];

   setStartDate_DEPRECATED(date) {
      this.startDate = new Date(date);
      this._setWeeks();
   };

   render() {
      this.view.innerHTML = '';
      this.weeks.forEach((week) => {
         this.view.appendChild(week.view);
      });         
   }

   getData() {
      fetch('/js/testOrders.json')
         .then((res) => res.json())
         .then ((data) => {
            this.orders = new Orders(data, this.startDate);
            this._setWeeks();
         })
   }

   _setWeeks() {
      let currentDate = new Date(this.startDate.toJSON());
      this.weeks = [];
      for (let i=0; i<3; i++) {
         this.weeks.push(new Week(currentDate, this.titles, this.orders));
         currentDate = new Date(this.weeks[i].nextDate.toJSON());
      };
      this.render();
   }
 
   constructor(startDate, titles) {
      this.startDate = startDate;
      this.titles = titles;
      this.view = document.createElement('div');
      this.getData();

      document.addEventListener('wheel', (event) => {
         if (event.deltaY<0) {
            this.startDate.setDate(this.startDate.getDate()-7);
            this._setWeeks();
         }
         if (event.deltaY>0) {
            this.startDate.setDate(this.startDate.getDate()+7);
            this._setWeeks();
         }
      });

      // document.addEventListener('orderMoved', (e) => {
      //    this.render()
      //    // orders.save();
      // });

      // document.addEventListener('keyup', (event) => {
      //    if (event.key=='PrintScreen') {
      //       this.setStartDate('2021-05-01');
      //    }
      // });
   }
};