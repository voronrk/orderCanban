import Day from "./Day.js";

export default class Week {

    daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];

    constructor(firstDate, titles, order, orders) {
        this.orders = orders;
        this.firstDate = new Date();
        this.firstDate.setDate(this.firstDate.getDate());
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');

        let currentOrder = order;
        let currentDate = new Date();
        for (let i=0; i < 7; i++) {
            currentDate.setDate(firstDate.getDate()+i);
            let newDay = new Day(titles, this.daysOfWeek[i], currentDate, currentOrder, this.orders);
            this.view.appendChild(newDay.view);
            currentOrder = newDay.nextOrder;
        };
        
        this.nextOrder = currentOrder ? currentOrder : null;
    }
}