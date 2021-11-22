export default class OrderItem {

    constructor(data={}) {
        this.data = data;
        this.view = document.createElement('div');
        this.view.classList.add('columns','order-row');
        this.view.draggable=true;

        this.view.addEventListener('dragstart', (event) => {
            event.target.classList.add('dragged');
            event.target.id = 'dragging';
            event.dataTransfer.setData("text", event.target.id);
            setTimeout(() => event.target.classList.add('is-hidden'), 0);
            this.data['previousOrder']['nextOrder'] = this.data['nextOrder'];
            this.data['previousOrder'] = null;
            this.data['nextOrder'] = null;

            
        });
        this.view.addEventListener('dragend', (event) => {
            event.target.classList.remove('dragged');
            event.target.classList.remove('is-hidden');
        });

        this.view.addEventListener('dragenter', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let node = document.querySelector('#dragging');
            if (event.target.classList.contains('column-order')) {
                event.target.parentNode.parentNode.insertBefore(node, event.target.parentNode);
            };
        });
    }
}