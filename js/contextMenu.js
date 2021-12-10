export default class ContextMenu {

    _render(x,y) {
        this.view = document.createElement('div');
        this.view.classList.add('context-menu', 'box', 'is-small');
        this.view.innerText = 'aaaaaaa';
        this.view.style.left = `${x}px`;
        this.view.style.top = `${y}px`;
    }

    constructor (order, x, y) {
        this.order = order;
        this._render(x,y);

        document.addEventListener('click', (e) => {
            e.stopPropagation();
            this.view.classList.add('is-hidden');
            this.view.parentNode.classList.remove('clicked');
        });
    }
}