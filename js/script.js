'use sctrict';
import MainWrapper from "./MainWrapper.js";

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

for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabsDeactivate();
        e.target.parentNode.classList.add('is-active');
        const machine = e.target.dataset.machine;
        const main = new MainWrapper(titles, machine);
    });
};

