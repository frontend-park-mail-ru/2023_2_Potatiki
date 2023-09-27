import Form from '../../components/form/form.js';
import A from '../../components/a/a.js';
import '../templates.js';

export default class LoginPage {
  #parent;

  #config;

  #router;

  constructor(parent, config, router) {
    this.#parent = parent;
    this.#config = config;
    this.#router = router;
  }

  get self() {
    return document.getElementById('login-page');
  }

  formListener(e) {
    e.preventDefault();
    const form = document.forms['login-form'];
    const login = form.elements.login.value.trim();
    const password = form.elements.password.value;
    console.log('login', login, password);
    form.elements.login.value = '';
    form.elements.password.value = '';
    this.checkPassword(password);
  }

  checkPassword(password) {
    if (password !== 'password') {
      const errorConfig = {
        error: true,
        errorText: 'Wrong password',
      };
      const passwordErrConfig = Object.assign(this.#config.loginPage.inputs.password, errorConfig);
      const newConfig = this.#config.loginPage;
      newConfig.inputs.password = passwordErrConfig;

      const loginForm = new Form(this.self, newConfig, this.formListener.bind(this));
      loginForm.render();
      return;
    }
    this.#router('main', true);
  }

  render() {
    this.#parent.innerHTML = '';

    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['login-page.hbs']());

    const logo = new A(this.self, this.#config.loginPage.logo);
    logo.render();

    const loginForm = new Form(this.self, this.#config.loginPage, this.formListener.bind(this));
    loginForm.render();
  }
}
