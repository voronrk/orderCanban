'use sctrict';

import Week from "./Week.js";
import {testOrders as workData} from "./testOrders.js";

const container=document.querySelector('.container');
const titles = ['№','Время','Заказчик','Параметры заказа'];
const beginDate = new Date(2021,9,30);
// console.log(beginDate);

// workData[0]['previousOrder'] = null;
// workData[workData.length-1]['nextOrder'] = null;


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

let newWeek = new Week(beginDate, titles, workData[0]);
container.appendChild(newWeek.view);

// let newWeek2 = new Week(titles, workData);
// container.appendChild(newWeek2.view);
