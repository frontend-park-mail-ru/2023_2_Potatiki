import Link from '../../components/link/link.js';
import LoginForm from '../../components/loginForm/loginForm.js';
import Ajax from '../../modules/ajax.js';
import '../templates.js';

/**
 *
 */
export default class LoginPage {
    #parent;

    #config;

    #router;

    /**
   *
   * @param {*} parent
   * @param {*} config
   * @param {*} router
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router;
    }

    /**
   *
   */
    get self() {
        return document.getElementById('login-page');
    }

    /**
   *
   * @param {*} e
   */
    formListener(e) {
        e.preventDefault();
        const form = document.forms['login-form'];
        const login = form.elements.login.value.trim();
        const password = form.elements.password.value;
        form.elements.password.value = '';

        // validate
        const [statusCode, message] = Ajax.postRequest(
            '/api/v1/signin',
            {login, password},
        );
        switch (statusCode) {
        case 200:
            this.#router('main', true);
            break;
        case 401:
        // add from error (make visible)
        // this.renderError('password', message);
            break;
        case 500:
            this.renderServerError(message);
            break;
        default:
            console.log('undefined status code:', statusCode);
        }
        this.checkPassword(password);
    }

    /**
   *
   * @param {*} msg
   */
    renderServerError(msg) {
        const serverError = document.createElement('div');
        serverError.setAttribute('server-error');
        serverError.textContent = msg;
        document.body.appendChild(serverError);
        setTimeout(() => {
            document.body.removeChild(document.getElementById('server-error'));
        }, 5000);
    }

    // add removeListeners


    /**
   *
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['login-page.hbs'](),
        );

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        const loginForm = new LoginForm(
            this.self,
            this.#config.loginPage.form,
            this.formListener.bind(this),
        );

        loginForm.render();
    }
}
