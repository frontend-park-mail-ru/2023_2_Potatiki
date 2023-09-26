// import Header from "../../components/header/header.js";
import Form from "../../components/form/form.js";
import BasePage from "../base-page.js";
import '../templates.js'


// <div class="{{input-container-class}}">
//     {{#if label}}<label class="{{label-class}}" for="{{label-for}}">{{label-text}}</label>{{/if}}
//     <input class="{{input-class}}" type="{{input-type}}" autocomplete="{{autocomplete}}" name="{{input-name}}" placeholder="{{input-placeholder}}"> 
//     {{#if error}}<div class="{{input-error}}">{{error-text}}</div>{{/if}}
// </div>

const loginConfig = {
    "formName": "login-form",
    "formId": "login-form",
    

    "inputs": [{
        "input-class": "ic1",
        "input-name": "login",
        "input-placeholder": "Введите логин",
        "error": false,
        "label": false
        },

        {   
        "input-class": "ic1",
        "input-name": "password",
        "input-placeholder": "Введите пароль",
        "error": false,
        "label": false,
        "input-type": "password"
        }
    ],

    "submit": {
        "button-class": "bc1",
        "button-type": "submit",
        "id": "login-submit-button",
        "button-text": "Login"
    }
    
}

export default class LoginPage { // extends BasePage {
    #parent;
    #template;

    constructor(parent, template) {
        this.#parent = parent;
        this.#template = template;
    }

    formListener(e) {
        e.preventDefault();
        const form = document.forms["login-form"];
        const login = form.elements["login"].value.trim();
        const password = form.elements["password"].value;
        console.log("login", login, password);
    }
    

    render() {
        // console.log(loginConfig)
        this.#parent.innerHTML = '';

        this.#parent.innerHTML += window.Handlebars.templates['login-page.hbs']();

        const self = document.getElementById('login-page')
        const loginForm = new Form(self);
        loginForm.render(loginConfig, this.formListener.bind(this))
    }
}   