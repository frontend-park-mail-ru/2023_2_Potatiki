import Form from '../../components/form/form.js';
import Link from '../../components/link/link.js';
import '../templates.js';

export default class SignupPage {
  #parent;

  #config;

  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;
  }

  formListener(e) {
    e.preventDefault();
    const form = document.forms['signup-form'];
    const login = form.elements.login.value.trim();
    const name = form.elements.name.value.trim();
    const password = form.elements.password.value;
    const repeatPassword = form.elements['repeat-password'].value;
    console.log('signup', login, name, password, repeatPassword);
  }

  render() {
    this.#parent.innerHTML = '';

    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['signup-page.hbs']());

    const self = document.getElementById('signup-page');

    const logo = new Link(self, this.#config.loginPage.logo);
    logo.render();

    const loginForm = new Form(self, this.#config.loginPage, this.formListener.bind(this));
    loginForm.render();
  }
}
