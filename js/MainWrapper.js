import WorkArea from "./WorkArea.js";
import Hope from "./Hope.js";

export default class MainWrapper {

   render() {
      this.view.innerHTML = '';
      this.weeks.forEach((week) => {
         this.view.appendChild(week.view);
      });         
   }

   renderWorkArea() {
        const workField = document.querySelector('#work-field');
        let startDate = new Date();
        startDate.setDate(new Date().getDate()-new Date().getDay()+1);
        startDate = new Date(startDate.toDateString());
        workField.innerHTML = '';
        this.workArea = new WorkArea(startDate, this.titles, this.machine);
        workField.appendChild(this.workArea.view);
    }

   renderHope() {
        const hopeField = document.querySelector('#hope-field');
        fetch('/back/getData.php', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                machine: this.machine
            })
            })
            .then((res) => res.json())
            .then ((data) => {
                hopeField.innerHTML = '';
                this.hope = new Hope(data['notplanned']);
                hopeField.appendChild(this.hope.view);
            });
    }

     constructor(titles, machine) {
        this.machine = machine;
        // this.startDate = startDate;
        this.titles = titles;
        this.view = document.createElement('div');
        this.renderHope();
        this.renderWorkArea();

        this.view.addEventListener('orderRejected', (e) => {
            console.log('rejected');
            console.log(e.detail);
            this.hope.orders.push(e.detail);
            this.hope._render();
        })
   }
};