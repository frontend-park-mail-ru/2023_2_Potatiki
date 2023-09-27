import Form from '../../components/form/form';
import A from '../../components/a/a';
import '../templates';

export default class SignupPage { // extends BasePage {
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

    const logo = new A(self, this.#config.loginPage.logo);
    logo.render();

    const loginForm = new Form(self, this.#config.loginPage, this.formListener.bind(this));
    loginForm.render();
  }
}
