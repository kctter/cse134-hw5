class ButtonCount extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        let btnCount = document.createElement('button');
        btnCount.setAttribute('counter', 0);
        btnCount.textContent = `Times Clicked: ${btnCount.getAttribute('counter')}`;

        btnCount.addEventListener('click', () => {
            let count = parseInt(btnCount.getAttribute('counter'));
            btnCount.setAttribute('counter', ++count);
            btnCount.textContent = `Times Clicked: ${btnCount.getAttribute('counter')}`;
        });
        shadow.appendChild(btnCount);
    };
}

window.customElements.define('button-count', ButtonCount);