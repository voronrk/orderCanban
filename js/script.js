'use sctrict';

import WorkArea from "./WorkArea.js";
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


var workArea = new WorkArea(beginDate, titles, workData[0]);
container.appendChild(workArea.view);



//==============================debug===========================
document.addEventListener('keyup', (event) => {
   if (event.key=='PrintScreen') {
      console.log('update');
      workArea.render();
   }
});
//==============================================================