import Link from '../../components/link/link.js';
import SignupForm from '../../components/signupForm/signupForm.js';
import Ajax from '../../modules/ajax.js';
import '../templates.js';

/**
 * Класс страницы регистрации
 */
export default class SignupPage {
    #parent;

    #config;

    #router;

    signupForm;
    isValidForm = false;

    /**
   * Конструктор класса
   * @param {Element} parent Родительский элемент
   * @param {Object} config Конфиг для отрисовки страницы
   * @param {Function} router Функция осуществляющая переход на другую страницу
   */
    constructor(parent, config, router) {
        this.#parent = parent;
        this.#config = config;
        this.#router = router;
    }

    /**
   * Получение элемента страницы из документа
   */
    get self() {
        return document.getElementById('signup-page');
    }

    /**
   * Обработка формы регистрации
   * @param {Object} event Событие отправки формы
   */
    formListener(event) {
        event.preventDefault();
        const form = document.forms['signup-form'];
        const login = form.elements.login.value;
        const password = form.elements.password.value;

        if(this.isValidForm) {
          Ajax.prototype.postRequest('auth/signup', {'login': login, 'password': password}).then((result) => {
            const [statusCode, body] = result;
            this.signupForm.removeError();

            switch (statusCode) {
              case 200:
                  this.#router('main', true);
                  break;
              case 400:
                  this.signupForm.renderError('Такой логин уже существует');
                  break;
              case 429:
                  this.signupForm.renderError('Такой логин уже существует');
                  break;
              default:
                  console.log('undefined status code:', statusCode);
            }
          });
        }
    }

    /**
     * Валидация логина
     * @param {String} login Логин пользователя
     * @return {Boolean} Результат проверки
     */
    checkLogin(login) {
      if(login.length < 6) {
        this.isValidForm = false;
        return 'Минимальная длина 6 символов';
          
      }

        for (let i = 0; i < login.length; ++i) {
            if (!(login.codePointAt(i) >= 0x41 && login.codePointAt(i) <= 0x5A ||
          login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A ||
          login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39)) {
          this.isValidForm = false;
          return 'Разрешена только латиница и цифры';
        }
      }

      this.isValidForm = true;
      return '';
    }

    /**
     * Валидация пароля
     * @param {String} pass Пароль пользователя
     * @return {Boolean} Результат проверки
     */
    checkPassword(pass) {
      if(pass.length < 8) {
          this.isValidForm = false;
          return 'Минимальная длина 8 символов';
      }

        let isHasUpperLetter = false;
        let isHasLowerLetter = false;
        let isHasDigit = false;

      for (let i = 0; i < pass.length; ++i) {
        if(pass.codePointAt(i) >= 0x41 && pass.codePointAt(i) <= 0x5A) {
          isHasUpperLetter = true;
        } else if(pass.codePointAt(i) >= 0x61 && pass.codePointAt(i) <= 0x7A) {
          isHasLowerLetter = true;
        } else if(pass.codePointAt(i) >= 0x30 && pass.codePointAt(i) <= 0x39) {
          isHasDigit = true;
        } else {
          this.isValidForm = false;
          return 'Разрешена только латиница и цифры';
        }
      }

      if(isHasDigit && isHasLowerLetter && isHasUpperLetter) { 
        this.isValidForm = true;
        return '';
      }

      this.isValidForm = false;
      return 'Должны быть заглавные, прописные буквы латиницы и цифры';
    }

    checkEqualityPassword(pass) {
      return function(reapeatPass) {
        if(pass.value !== reapeatPass) {
          this.isValidForm = false;
          return 'Пароли не совпадают';
        }
        
        this.isValidForm = true;
        return '';
      }
    }

    // add removeListeners

    /**
   * Отрисовка страницы
   */
    render() {
        this.#parent.innerHTML = '';

        this.#parent.insertAdjacentHTML(
            'beforeend',
            window.Handlebars.templates['signup-page.hbs'](),
        );

        const logo = new Link(this.self, this.#config.loginPage.logo);
        logo.render();

        this.signupForm = new SignupForm(
            this.self,
            this.#config.signupPage.form,
            this.formListener.bind(this),
        );

        this.signupForm.render();

        this.signupForm.login.addFocusOutListener(this.checkLogin.bind(this));
        this.signupForm.login.addFocusInListener();

        this.signupForm.password.addFocusOutListener(this.checkPassword.bind(this));
        this.signupForm.password.addFocusInListener();

        this.signupForm.reapeatPassword.addFocusOutListener(this.checkEqualityPassword(this.signupForm.password).bind(this));
        this.signupForm.reapeatPassword.addFocusInListener();
    }
}
