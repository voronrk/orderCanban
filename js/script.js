'use sctrict';

import WorkArea from "./WorkArea.js";
import {testOrders as workData} from "./testOrders.js";
import Orders from "./Orders.js";

const container=document.querySelector('.container');
const titles = ['№','Время','Заказчик','Параметры заказа'];
const beginDate = new Date(2021,9,21);
let draggable = {};

fetch('/js/testOrders.json')
   .then((res) => res.json())
   .then ((data) => {
      let orders = new Orders(data);
      let workArea = new WorkArea(beginDate, titles, orders);
      container.appendChild(workArea.view);

      //==============================debug===========================
      document.addEventListener('keyup', (event) => {
         if (event.key=='PrintScreen') {
            console.log('update');
            workArea.render();
         }
      });
      //==============================================================
   });

// orders.moveBefore(orders.data[5], orders.data[0]);
// orders.debug(orders.firstOrder());
// console.log(orders.firstOrder());
// console.log(orders.lastOrder());

