import Week from "./Week.js";
import { dateForSave } from "./functions.js";

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

   setOrders(machine) {
      console.log(this.startDate);
      fetch('/back/getData.php', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
             date: dateForSave(this.startDate),
             machine: machine
          })
         })
         .then((res) => res.json())
         .then ((data) => {
              if (data['maxhours']) {
                  this.workHoursCountMax = data['maxhours']
              } else {
                  // this._saveMaxHours();
              };
            //   this.orders = new Orders(data['planned'], this.date);
            //   this.orders.setLinks();
            //   this._render();
            console.log(data['planned']);
      })
  }
 
   constructor(startDate, titles, machine) {
      this.machine = machine;
      this.startDate = startDate;
      this.titles = titles;
      this.view = document.createElement('div');
      this.orders = [];
      // this.setOrders(this.machine);
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