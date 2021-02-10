'use sctrict';

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
   newOrder.classList.add('order');
   newOrder.classList.add('is-size-7');
   newOrder.id='o11';
   newOrder.draggable="true";
   newOrder.innerHTML=`
   <input class="input is-small" type="text" placeholder="Номер заказа" focus>
   <input class="input is-small" type="text" placeholder="Заказчик">
   <input class="input is-small" type="text" placeholder="Параметры заказа">
   <input class="input is-small" type="text" placeholder="Бумага">
   <input class="input is-small" type="text" placeholder="Формат">
   <input class="input is-small" type="text" placeholder="Кол-во форм">
   <input class="input is-small" type="text" placeholder="Кол-во листопрогонов">
   <input class="input is-small" type="time" placeholder="Время план.">
   <div class="buttons are-small">
      <button class="button" id="save-button">Сохранить</button>
      <button class="button" id="cancel-button">Отмена</button>
   </div>
   `;
};

const renderOrderCardSmall = (orderCard) => {
   // let orderCard=destinationNode.parentNode.appendChild(document.createElement('div'));
   console.log(orderCard);
   orderCard.innerHTML=`
   <table class="table isfullwidth is-bordered">
      <tr><th>№</th><th>Формат</th><th>Л/п</th><th>Время</th></tr>
      <tr><td>5567</td><td>60x90</td><td>3200</td><td>00:20</td></tr>
   </table>
   `;
};

body.addEventListener('drop', (event) => {
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
   event.stopPropagation();
   event.preventDefault();
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
      console.log(target.id);
      renderOrderCardSmall(target.parentNode.parentNode);
   }
});