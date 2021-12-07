'use sctrict';

import WorkArea from "./WorkArea.js";
import {testOrders as workData} from "./testOrders.js";
import Orders from "./Orders.js";

const workField=document.querySelector('#work-field');
const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];

let startDate = new Date();
startDate.setDate(new Date().getDate()-new Date().getDay()+1);
startDate = new Date(startDate.toDateString());
console.log(startDate.toDateString());

let dragging = {};

let workArea = new WorkArea(startDate, titles);
workField.appendChild(workArea.view);

document.addEventListener('keyup', (event) => {
    if (event.key=='PrintScreen') {
    console.log(workArea);
    }
});
