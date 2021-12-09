import Week from "./Week.js";

export default class WorkArea {

   weeks = [];

   render() {
      this.view.innerHTML = '';
      this.weeks.forEach((week) => {
         this.view.appendChild(week.view);
      });         
   }

   _setWeeks(machine) {
      let currentDate = new Date(this.startDate.toDateString());
      this.weeks = [];
      for (let i=0; i<3; i++) {
         this.weeks.push(new Week(currentDate.toDateString(), this.titles, this.orders, machine));
         currentDate = new Date(this.weeks[i].nextDate.toDateString());
      };
      this.render();
   }
 
   constructor(startDate, titles, machine) {
      this.machine = machine;
      this.startDate = startDate;
      this.titles = titles;
      this.view = document.createElement('div');
      this.orders = [];
      this._setWeeks(machine);

      document.addEventListener('wheel', (event) => {
         if (event.deltaY<0) {
            this.startDate.setDate(this.startDate.getDate()-7);
         };
         if (event.deltaY>0) {
            this.startDate.setDate(this.startDate.getDate()+7);
         };
         this._setWeeks(this.machine);
      });

      document.addEventListener('keyup', (event) => {
         if (event.key=='PrintScreen') {
            console.log(this.weeks);
         }
      });
   }
};