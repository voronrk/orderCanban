import Day from "./Day.js";

export default class Week {

    days = [];

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    render() {
        this.view.innerHTML = '';
        this.days.forEach((day) => {
           this.view.appendChild(day.view);
        });         
    }

    _setDays(titles) {
        let currentDate = new Date(this.startDate.toDateString());
        for (let i=0; i<7; i++) {
           this.days.push(new Day(titles, this.daysOfWeek[i], currentDate.toDateString(), this.orders));
           currentDate.setDate(currentDate.getDate()+1);
        };
        this.render();
        this.nextDate = new Date(currentDate.toDateString());
    }

    constructor(startDate, titles, orders) {
        this.orders = orders;
        this.startDate = new Date(startDate);
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');

        this._setDays(titles);

    }
}