'use sctrict';

import WorkArea from "./WorkArea.js";
import {testOrders as workData} from "./testOrders.js";
import Orders from "./Orders.js";

const workField=document.querySelector('#work-field');
const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];

const startDate = new Date();
startDate.setDate(new Date().getDate()-new Date().getDay()+1);
// console.log(startDate);

let draggable = {};

let workArea = new WorkArea(startDate, titles);
workField.appendChild(workArea.view);

document.addEventListener('keyup', (event) => {
    if (event.key=='PrintScreen') {
    console.log(workArea);
    }
});

// fetch('/js/testOrders.json')
//    .then((res) => res.json())
//    .then ((data) => {
//       // data = JSON.parse(localStorage.getItem('orders'));
//       let orders = new Orders(data);
//       let workArea = new WorkArea(startDate, titles, orders);
//       container.appendChild(workArea.view);
//       // orders.save();
//       // console.log(orders);

//       //==============================debug===========================
//       document.addEventListener('keyup', (event) => {
//          if (event.key=='PrintScreen') {
//             console.log(orders.debug(orders.firstOrder()));
//          }
//       });
//       //==============================================================
//    });
