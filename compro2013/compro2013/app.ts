class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    test: string;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
        this.test = "testes";
        this.stop = this.awesome
        blarg blarg blarg


    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 900);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

