'use sctrict';
import WorkArea from "./WorkArea.js";
import Hope from "./Hope.js";
import PostpressItem from "./PostpressItem.js";

const workField = document.querySelector('#work-field');
const hopeField = document.querySelector('#hope-field');
const tabs = document.querySelectorAll('#tabs>li>a');

const titles = ['№','Время','Заказчик','Параметры заказа', 'Дата'];
let dragging = {};

function tabsDeactivate() {
    for (const tab of tabs) {tab.parentNode.classList.remove('is-active')};
};

function renderWorkArea(machine) {
    let startDate = new Date();
    startDate.setDate(new Date().getDate()-new Date().getDay()+1);
    startDate = new Date(startDate.toDateString());
    workField.innerHTML = '';
    let workArea = new WorkArea(startDate, titles, machine);
    workField.appendChild(workArea.view);
}

async function renderHope(machine) {
    return fetch('/back/getData.php', {
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            machine: machine
         })
        })
        .then((res) => res.json())
        .then ((data) => {
            hopeField.innerHTML = '';
            let hope = new Hope(data['notplanned']);
            hopeField.appendChild(hope.view);
     });    
}

for (const tab of tabs) {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabsDeactivate();
        e.target.parentNode.classList.add('is-active');
        const machine = e.target.dataset.machine;
        renderHope(machine);
        renderWorkArea(machine);
    });
};

