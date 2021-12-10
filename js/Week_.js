import Day from "./Day.js";

export default class Week {

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    constructor(startDate, titles, order, orders) {
        this.orders = orders;
        this.startDate = new Date();
        this.startDate.setDate(startDate.getDate());
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');

        let currentOrder = order;
        let currentDate = new Date(startDate.toJSON());
        for (let i=0; i < 7; i++) {
            currentDate.setDate(this.startDate.getDate()+i);
            let newDay = new Day(titles, this.daysOfWeek[i], currentDate, currentOrder, this.orders);
            this.view.appendChild(newDay.view);
            currentOrder = newDay.next;
        };
        this.nextDate = new Date();
        this.nextDate.setDate(currentDate.getDate()+1);
        this.next = currentOrder ? currentOrder : null;
    }
}