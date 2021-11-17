'use sctrict';

import Week from "./Week.js";

const container=document.querySelector('.container');
let daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
let dates = ['22.11.2021','23.11.2021','24.11.2021','25.11.2021','26.11.2021','27.11.2021','28.11.2021'];
let titles = ['№','Время','Заказчик','Параметры заказа'];

let testOrders = [
   {  dayOfWeek: daysOfWeek[0],
      date: dates[0],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'},      
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Глянцевая пленка'},      
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Голографическая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[1],
      date: dates[1],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[2],
      date: dates[2],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[3],
      date: dates[3],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[4],
      date: dates[4],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[5],
      date: dates[5],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   },
   {  dayOfWeek: daysOfWeek[6],
      date: dates[6],
      orders: [
         {orderNum: '3355', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
      ]
   }   
];

let newWeek = new Week(titles, testOrders);
container.appendChild(newWeek.view);

let newWeek2 = new Week(titles, testOrders);
container.appendChild(newWeek2.view);