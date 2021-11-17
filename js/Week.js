import Day from "./Day.js";

export default class Week {

    constructor(titles, data) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','is-gapless','week');
        data.forEach((day) => {
            let newDay = new Day(titles, day['dayOfWeek'], day['date'], day['orders'])
            this.view.appendChild(newDay.view);
        });
    }
}