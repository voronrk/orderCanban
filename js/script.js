'use sctrict';

import Week from "./Week.js";
import {testOrders as workData} from "./testOrders.js";

const container=document.querySelector('.container');
const titles = ['№','Время','Заказчик','Параметры заказа'];
const beginDate = new Date(2021,9,21);

for (let i in workData) {
   if (i == 0) {
      workData[i]['previousOrder'] = null;
   } else {
      workData[i]['previousOrder'] = workData[i-1];
      workData[i-1]['nextOrder']=workData[i];
   };
   if (i == (workData.length-1)) {
      workData[i]['nextOrder'] = null;
   };
};
console.log(workData);

let currentOrder = workData[0];
do {
   let newWeek = new Week(beginDate, titles, currentOrder);
   container.appendChild(newWeek.view);
   currentOrder = newWeek.nextOrder;
} while (currentOrder);
