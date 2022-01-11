'use sctrict';
import MainWrapper from "./MainWrapper.js";
import {socket} from "./socket.js";

const tabs = document.querySelectorAll('#tabs>li>a');
const clear = document.querySelector('#clear-base');

const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];
let dragging = {};

function tabsDeactivate() {
    for (const tab of tabs) {tab.parentNode.classList.remove('is-active')};
};

clear.addEventListener('click', () => {
    fetch('/back/clearBase.php')
        .then((res) => res.json())
        .then ((answer) => {
            console.log(answer);
        });
})

socket.onopen = function(e) {
  console.log("[open] Соединение установлено");
  // socket.send(user);
  for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabsDeactivate();
        e.target.parentNode.classList.add('is-active');
        const machine = e.target.dataset.machine;
        const main = new MainWrapper(titles, machine);
    });
    };
};

// socket.onmessage = function(event) {
//   console.log(`[message] Данные получены с сервера: ${event.data}`);
// };

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

