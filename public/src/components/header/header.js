import Button from '../button/button.js';
import Form from '../form/form.js';
import A from '../a/a.js';
import '../templates.js';


export default class Header {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render(config, profileAction) {
        this.#parent.innerHTML += window.Handlebars.templates['header.hbs']();
        const self = document.getElementById('header');

        const logo = new Button(self);
        logo.render(config.logo);

        const catalog = new Button(self);
        catalog.render(config.catalog);

        const search = new Form(self);
        search.render(config.search);

        const basket = new A(self);
        basket.render(config.basket);

        const user = new A(self);
        user.render(config.login, profileAction)
    }
}