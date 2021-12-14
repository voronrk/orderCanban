'use sctrict';
import WorkArea from "./WorkArea.js";
import Hope from "./Hope.js";
import PostpressItem from "./PostpressItem.js";
import MainWrapper from "./MainWrapper.js";

// const workField = document.querySelector('#work-field');
// const hopeField = document.querySelector('#hope-field');
const tabs = document.querySelectorAll('#tabs>li>a');

const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];
let dragging = {};

function tabsDeactivate() {
    for (const tab of tabs) {tab.parentNode.classList.remove('is-active')};
};

for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabsDeactivate();
        e.target.parentNode.classList.add('is-active');
        const machine = e.target.dataset.machine;
        const main = new MainWrapper(titles, machine);
    });
};

