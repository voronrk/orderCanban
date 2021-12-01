import Day from "./Day.js";

export default class Week {

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    constructor(startDate, titles, order, orders) {
        this.orders = orders;
        this.startDate = new Date();
        this.startDate.setDate(this.startDate.getDate());
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');

        let currentOrder = order;
        let currentDate = new Date();
        for (let i=0; i < 7; i++) {
            currentDate.setDate(startDate.getDate()+i);
            let newDay = new Day(titles, this.daysOfWeek[i], currentDate, currentOrder, this.orders);
            this.view.appendChild(newDay.view);
            currentOrder = newDay.nextOrder;
        };
        this.nextDate = new Date();
        this.nextDate.setDate(currentDate.getDate()+1);
        this.nextOrder = currentOrder ? currentOrder : null;
    }
}