let daysOfWeek = ['Понедельник', 'Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
let dates = ['22.11.2021','23.11.2021','24.11.2021','25.11.2021','26.11.2021','27.11.2021','28.11.2021'];

export const testOrders = [
    {id: '1',  orderNum: '1',  customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '2',  orderNum: '2',  customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '3',  orderNum: '3',  customer:'Детотрюн', duration:3, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '4',  orderNum: '4',  customer:'Детотрюн', duration:6, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '5',  orderNum: '5',  customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '6',  orderNum: '6',  customer:'Детотрюн', duration:4, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '7',  orderNum: '7',  customer:'Детотрюн', duration:7, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '8',  orderNum: '8',  customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '9',  orderNum: '9',  customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '10', orderNum: '10', customer:'Детотрюн', duration:4, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '11', orderNum: '11', customer:'Детотрюн', duration:3, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '12', orderNum: '12', customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '13', orderNum: '13', customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '14', orderNum: '14', customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '15', orderNum: '15', customer:'Детотрюн', duration:3, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '16', orderNum: '16', customer:'Детотрюн', duration:6, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '17', orderNum: '17', customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '18', orderNum: '18', customer:'Детотрюн', duration:4, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '19', orderNum: '19', customer:'Детотрюн', duration:7, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '20', orderNum: '20', customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '21', orderNum: '21', customer:'Детотрюн', duration:1, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '22', orderNum: '22', customer:'Детотрюн', duration:4, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '23', orderNum: '23', customer:'Детотрюн', duration:3, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
    {id: '24', orderNum: '24', customer:'Детотрюн', duration:2, options:'Матовая пленка', status: '', previousOrder: {}, nextOrder: {}, date: ''},
];

export const testOrders_ = [
    {  dayOfWeek: daysOfWeek[0],
       date: dates[0],
       orders: [
          {orderNum: '1', customer:'Детотрюн',duration:'1',options:'Матовая пленка'},      
          {orderNum: '2', customer:'Детотрюн',duration:'1',options:'Глянцевая пленка'},      
          {orderNum: '3', customer:'Детотрюн',duration:'1',options:'Голографическая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[1],
       date: dates[1],
       orders: [
          {orderNum: '4', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[2],
       date: dates[2],
       orders: [
          {orderNum: '5', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[3],
       date: dates[3],
       orders: [
          {orderNum: '6', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[4],
       date: dates[4],
       orders: [
          {orderNum: '7', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[5],
       date: dates[5],
       orders: [
          {orderNum: '8', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    },
    {  dayOfWeek: daysOfWeek[6],
       date: dates[6],
       orders: [
          {orderNum: '9', customer:'Детотрюн',duration:'1',options:'Матовая пленка'}      
       ]
    }   
 ];