import Day from "./Day.js";

export default class Week {

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    constructor(firstDate, titles, order) {
        this.firstDate = firstDate;
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');
        let currentOrder = order;
        console.log(firstDate);
        for (let i=0; i < 7; i++) {
            firstDate.setDate(firstDate.getDate()+1);
            let newDay = new Day(titles, this.daysOfWeek[i], firstDate, currentOrder);
            this.view.appendChild(newDay.view);
            currentOrder = newDay.nextOrder;
        }
        this.nextOrder = currentOrder ? currentOrder : null;
    }
}