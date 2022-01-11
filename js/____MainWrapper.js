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
        let startDate = new Date();
        startDate.setDate(new Date().getDate()-new Date().getDay()+1);
        startDate = new Date(startDate.toDateString());
        let workArea = new WorkArea(startDate, this.titles, this.machine);
        this.workField.appendChild(workArea.view);
    }

   renderHope() {
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
                this.hope = new Hope(data['notplanned']);
                this.hopeField.appendChild(this.hope.view);
            });
    }

     constructor(titles, machine) {
        this.workField = document.createElement('div');
        this.workField.classList.add('column', 'work-field');
        this.hopeField = document.createElement('div');
        this.hopeField.classList.add('column', 'is-1');

        this.machine = machine;
        this.titles = titles;
       
        this.renderHope()
        this.renderWorkArea()
        
        this.view = document.querySelector('#main-wrapper');
        this.view.innerHTML = '';
        this.view.appendChild(this.hopeField);
        this.view.appendChild(this.workField);

        this.view.addEventListener('orderRejected', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dragging.delete();
            dragging.update({
                prev: null,
                next: null,
                date: null
            });
            this.hope.orders.initOrder(dragging.data);
            this.hope._render();
        })

        window.addEventListener('beforeunload', function (e) {
            alert('aaaaaaaaaaaaaaa');
        });

        
   }
};