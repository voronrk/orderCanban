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

const renderOrderCardSmall = (orderDay, orderData) => {
   let orderRow=orderDay.appendChild(document.createElement('tr'));
   // orderRow.classList.add('order');
   // orderRow.classList.add('is-size-7');
   orderRow.draggable=true;
   orderRow.id=`o${orderData['num']}`;
   orderRow.innerHTML=`
      <tr>
         <td>${orderData['num']}</td>
         <td>${orderData['size']}</td>
         <td>${orderData['plates']}</td>
         <td>${orderData['clicks']}</td>
         <td>${orderData['time']}</td>
         <td>${orderData['paper']}</td>
         <td>${orderData['params']}</td>
         <td>${orderData['customer']}</td>
      </tr>
   `;
};

body.addEventListener('drop', (event) => {
   event.stopPropagation();
   event.preventDefault();
   targetNode=event.target;
   // console.log(targetNode);
   let data = event.dataTransfer.getData("Text");
   if (targetNode.nodeName=='TH') {
      console.log(targetNode.parentNode.parentNode);
      targetNode.parentNode.parentNode.appendChild(document.getElementById(data));
   } else if (targetNode.nodeName=='TD') {
      console.log(targetNode.parentNode.parentNode);
      console.log(targetNode);
      targetNode.parentNode.parentNode.insertBefore(document.getElementById(data),targetNode.parentNode);
   } else if (targetNode.id[0]=='c') {
      console.log(targetNode.children[2]);
      targetNode.children[2].appendChild(document.getElementById(data));
   };
   return false;
});

body.addEventListener('dragstart', (event) => {
   //  console.log(event);
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
      console.log(target.parentNode.parentNode.parentNode);
      for (let i=0; i<=7; i++) {
         orderData[target.parentNode.parentNode.children[i].id]=target.parentNode.parentNode.children[i].value;
      };
      
      console.log(orderData);
      renderOrderCardSmall(target.parentNode.parentNode.previousElementSibling, orderData);
      target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
      
   }
});