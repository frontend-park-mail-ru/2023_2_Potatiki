import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import '../templates.js';

export default class LoginPage {
  #parent;

  #config;

  #router;

  #ajax;

  constructor(parent, config, router, ajax) {
    this.#parent = parent;
    this.#config = config;
    this.#router = router;
    this.#ajax = ajax;
  }

  get self() {
    return document.getElementById('login-page');
  }

  formListener(e) {
    e.preventDefault();
    // e.target.removeEventListener('click', this.formListener); ???
    const form = document.forms['login-form'];
    const login = form.elements.login.value.trim();
    const password = form.elements.password.value;
    form.elements.login.value = '';
    form.elements.password.value = '';

    // validate
    const [statusCode, message] = this.#ajax.postRequest('/api/v1/signin', { login, password });
    switch (statusCode) {
      case 200:
        this.#router('main', true);
        break;
      case 401:
        this.renderError('password', message);
        break;
      case 500:
        this.renderServerError(message);
        break;
      default:
        console.log('undefined status code:', statusCode);
    }
    this.checkPassword(password);
  }

  renderServerError(msg) {
    const serverError = document.createElement('div');
    serverError.setAttribute('server-error');
    serverError.textContent = msg;
    document.body.appendChild(serverError);
    setTimeout(() => {
      document.body.removeChild(document.getElementById('server-error'));
    }, 5000);
  }

  renderError(field, msg) {
    const errorConfig = {
      error: true,
      errorText: msg,
    };
    const ErrConfig = Object.assign(this.#config.loginPage.inputs[field], errorConfig);
    const newConfig = this.#config.loginPage;
    newConfig.inputs[field] = ErrConfig;

    this.renderForm(newConfig);
  }

      return;
    }
    this.#router('main', true);
  }

  render() {
    this.#parent.innerHTML = '';

    this.#parent.insertAdjacentHTML('beforeend', window.Handlebars.templates['login-page.hbs']());

    const logo = new Link(this.self, this.#config.loginPage.logo);
    logo.render();

    const loginForm = new LoginForm(this.self, this.#config.loginPage.form, this.formListener.bind(this));
    loginForm.render();
  }
}
