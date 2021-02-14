'use sctrict';

let orderData={};

const body=document.querySelector('body');

body.addEventListener('dragenter', (event) => {
   event.preventDefault();
   return true;
});

body.addEventListener('dragover', (event) => {
    event.preventDefault();
});

body.addEventListener('dragdrop', (event) => {
   event.preventDefault();
});

const addOrder = (currentElement) => {
   let newOrder=currentElement.parentNode.appendChild(document.createElement('div'));
   // newOrder.classList.add('order');
   newOrder.classList.add('is-size-7');
   // newOrder.id='o11';
   newOrder.draggable="true";
   newOrder.innerHTML=`
      <input class="input is-small" type="text" id="num" placeholder="Номер заказа" focus>
      <input class="input is-small" type="text" id="customer" placeholder="Заказчик">
      <input class="input is-small" type="text" id="params" placeholder="Параметры заказа">
      <input class="input is-small" type="text" id="paper" placeholder="Бумага">
      <input class="input is-small" type="text" id="size" placeholder="Формат">
      <input class="input is-small" type="text" id="plates" placeholder="Кол-во форм">
      <input class="input is-small" type="text" id="clicks" placeholder="Кол-во листопрогонов">
      <input class="input is-small" type="time" id="time" placeholder="Время план.">
      <div class="buttons are-small">
         <button class="button" id="save-button">Сохранить</button>
         <button class="button" id="cancel-button">Отмена</button>
      </div>
   `;
};

const renderOrderCardSmall = (orderCard, orderData) => {
   orderCard.classList.add('order');
   orderCard.classList.add('is-size-7');
   orderCard.draggable=true;
   orderCard.id=`o${orderData['num']}`;
   orderCard.innerHTML=`
   <table class="table is-fullwidth is-bordered is-narrow">
      <tr><th>№</th><th>Формат</th><th>Форм</th><th>Л/п</th><th>Время</th><th>Бумага</th></tr>
      <tr>
         <td>${orderData['num']}</td>
         <td>${orderData['size']}</td>
         <td>${orderData['plates']}</td>
         <td>${orderData['clicks']}</td>
         <td>${orderData['time']}</td>
         <td>${orderData['paper']}</td>
      </tr>
      <tr><td>Параметры</td><td colspan="5">${orderData['params']}</td></tr>
      <tr><td>Заказчик</td><td colspan="5">${orderData['customer']}</td></tr>
   </table>
   `;
};

body.addEventListener('drop', (event) => {
   event.stopPropagation();
   event.preventDefault();
   console.log(event.target);
   let data = event.dataTransfer.getData("Text");
   if (event.target.id[0]=='c') {
      event.target.appendChild(document.getElementById(data));
   } else if (event.target.id[0]=='o') {
      event.target.parentNode.insertBefore(document.getElementById(data), event.target);
   } else if (event.target.parentNode.parentNode.parentNode.parentNode.id[0]=='o') {
      console.log(event.target.parentNode.parentNode.parentNode.parentNode);
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(document.getElementById(data), event.target.parentNode.parentNode.parentNode.parentNode);
   };
   return false;
});

body.addEventListener('dragstart', (event) => {
    console.log(event);
    event.dataTransfer.effectAllowed='move';
    event.dataTransfer.setData("Text", event.target.getAttribute('id'));  
    event.dataTransfer.setDragImage(event.target,100,100);
    return true;
});

body.addEventListener('click', (event) => {
   const target=event.target;
   if (target.className.indexOf('order-add')>0) {
      addOrder(target);
   };
   if (target.id=='save-button') {
      console.log(target.parentNode.parentNode);
      for (let i=0; i<=7; i++) {
         orderData[target.parentNode.parentNode.children[i].id]=target.parentNode.parentNode.children[i].value;
      };
      
      console.log(orderData);
      renderOrderCardSmall(target.parentNode.parentNode, orderData);
   }
});