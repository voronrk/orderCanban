import WorkArea from "./WorkArea.js";
import Hope from "./Hope.js";
import { socket, user } from "./socket.js";
import {dataForSendToSocket, dateForSave} from "./functions.js";

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
        this.workArea = new WorkArea(startDate, this.titles, this.machine);
        this.workField.appendChild(this.workArea.view);
    }

    renderHope() {
        this.hope = new Hope(this.machine);
        this.hopeField.appendChild(this.hope.view);
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
            socket.send(dataForSendToSocket(user, 0));
        })

        socket.onmessage = (e) => {
            console.log(e.data);
            if (e.data==0) {
                this.hope._reload();
            } else {
                for (let week of this.workArea.weeks) {
                    for (let day of week.days) {
                        if (dateForSave(day.date)==e.data) {
                            console.log(dateForSave(day.date));
                            day._reload();
                        };
                    };
                };
            };
        };
    }
};