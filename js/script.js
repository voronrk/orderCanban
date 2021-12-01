'use sctrict';

import WorkArea from "./WorkArea.js";
import {testOrders as workData} from "./testOrders.js";
import Orders from "./Orders.js";

const container=document.querySelector('.container');
const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];
const beginDate = new Date("2021-11-21");
let draggable = {};

fetch('/js/testOrders.json')
   .then((res) => res.json())
   .then ((data) => {
      // data = JSON.parse(localStorage.getItem('orders'));
      let orders = new Orders(data);
      let workArea = new WorkArea(beginDate, titles, orders);
      container.appendChild(workArea.view);
      // orders.save();
      // console.log(orders);

      //==============================debug===========================
      document.addEventListener('keyup', (event) => {
         if (event.key=='PrintScreen') {
            console.log(orders.debug(orders.firstOrder()));
         }
      });
      //==============================================================
   });
