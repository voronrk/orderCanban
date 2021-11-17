export const renderOrder = (orderData) => {
    
};

export const renderDay = (title, date, orders = {}) => {
    day = `
        <div class="column column-day" id="c2">
            <div class="head">
                <div>${title}</div>
                <div>${date}</div>
            </div>
            <div class="head order-add">+</div>
            <div class="columns is-gapless has-text-weight-bold">
                <div class="column column-order has-text-centered is-size-7 is-1">№</div>
                <div class="column column-order has-text-centered is-size-7 is-1">Формат</div>
                <div class="column column-order has-text-centered is-size-7 is-1">Форм</div>
                <div class="column column-order has-text-centered is-size-7 is-1">Л/п</div>
                <div class="column column-order has-text-centered is-size-7 is-1">Время</div>
                <div class="column column-order has-text-centered is-size-7 is-2">Бумага</div>
                <div class="column column-order has-text-centered is-size-7 is-3">Параметры заказа</div>
                <div class="column column-order has-text-centered is-size-7 is-2">Заказчик</div>
            </div>
        </div>
    `;
    return day;
};