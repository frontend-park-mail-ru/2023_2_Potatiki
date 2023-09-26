import Header from "../../components/header/header.js";
import BasePage from "../base-page.js";
import LoginPage from "../login-page/login-page.js";
import '../templates.js'

const headerConfig = {
    "logo": {
        "button-class": "bc1",
        "button-type": "submit",
        "id": "logo-button",
        "button-text": "Hello mir"
    },

    "catalog": {
        "button-class": "bc2",
        "button-type": "submit",
        "id": "catalog-button"
    },

    "search": {
        "formId": "search-form",
        "form-class": "fc1",
        "inputs": [
            {"input-class": "ic1"}
        ],
        "submit": {
            "button-class": "bc3",
            "button-type": "submit",
            "id": "search-button"
        }
    },

    "basket": {
            "id": "basket-button",
            "a-class": "ac1",
            "a-href": "#",
            "withImg": true,
            "img-src": "./images/basket.svg"
    },

    "login": {
        "id": "login-button",
        "a-class": "ac1",
        "a-href": "login",
        "withImg": true,
        "img-src": "./images/user.svg"
    },

    "logout": {
            "id": "logout-button",
            "a-class": "ac1",
            "a-href": "#",
            "withImg": true,
            "img-src": "./images/logaut.svg"
    }
};

export default class MainPage { // extends BasePage {
    #parent;
    #template;

    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    renderLoginPage(e) {
        e.preventDefault();
        const loginPage = new LoginPage(this.#parent);
        loginPage.render();
    }

    

    render() {
        console.log(headerConfig)
        this.#parent.innerHTML = '';

        this.#parent.innerHTML += window.Handlebars.templates['main-page.hbs']();

        const self = document.getElementById('main-page')
        const header = new Header(self);
        header.render(headerConfig, this.renderLoginPage.bind(this));
    }
}