import Day from "./Day.js";

export default class Week {

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    constructor(firstDate, titles, order) {
        // this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');
        let currentOrder = order;
        for (let i=0; i < 7; i++) {
            let newDay = new Day(titles, this.daysOfWeek[i], firstDate, currentOrder);
            this.view.appendChild(newDay.view);
            currentOrder = newDay.nextOrder;
        }

    }
}