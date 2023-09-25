
export default class BasePage {
    #parent;
    #template;

    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    render(data) {
        this.#parent.innerHTML = this.#template(data);
    }
}