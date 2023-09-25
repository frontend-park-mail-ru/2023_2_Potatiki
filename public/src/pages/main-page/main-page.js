import BasePage from "../base-page";

export default class MainPage extends BasePage {
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