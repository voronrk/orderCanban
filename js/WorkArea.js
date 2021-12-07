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

   getData_JS() {
      fetch('/js/testOrders.json')
         .then((res) => res.json())
         .then ((data) => {
            this.orders = new Orders(data, this.startDate);
            this._setWeeks();
         })
   }

   getData() {
      fetch('/getData.php', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({date: this.startDate.toDateString()})
         })
         .then((res) => res.json())
         .then ((data) => {
            console.log(data);
            this.orders = new Orders(data, this.startDate);
            this._setWeeks();
         })
   }

   _setWeeks() {
      let currentDate = new Date(this.startDate.toDateString());
      this.weeks = [];
      for (let i=0; i<3; i++) {
         this.weeks.push(new Week(currentDate.toDateString(), this.titles, this.orders));
         currentDate = new Date(this.weeks[i].nextDate.toDateString());
      };
      this.render();
   }
 
   constructor(startDate, titles) {
      this.startDate = startDate;
      this.titles = titles;
      this.view = document.createElement('div');
      this.orders = [];
      this._setWeeks();
      // this.getData();

      document.addEventListener('wheel', (event) => {
         if (event.deltaY<0) {
            this.startDate.setDate(this.startDate.getDate()-7);
         };
         if (event.deltaY>0) {
            this.startDate.setDate(this.startDate.getDate()+7);
         };
         this._setWeeks();
      });

      document.addEventListener('keyup', (event) => {
         if (event.key=='PrintScreen') {
            console.log(this.weeks);
         }
      });
   }
};