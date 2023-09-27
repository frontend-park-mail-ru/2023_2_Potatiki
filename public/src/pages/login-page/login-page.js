import Form from '../../components/form/form.js';
import A from '../../components/a/a.js';
import '../templates.js';

export default class LoginPage { // extends BasePage {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  formListener(e) {
    e.preventDefault();
    const form = document.forms['login-form'];
    const login = form.elements.login.value.trim();
    const password = form.elements.password.value;
    console.log('login', login, password);
  }

  render() {
    this.#parent.innerHTML = '';

    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['login-page.hbs']());

    const self = document.getElementById('login-page');

    const logo = new A(self, this.#config.loginPage.logo);
    logo.render();

    const loginForm = new Form(self, this.#config.loginPage, this.formListener.bind(this));
    loginForm.render();
  }
}
