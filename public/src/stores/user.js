import {AppDispatcher} from '../modules/dispatcher';
import {UserActionsType} from '../actions/user';
import Ajax from '../modules/ajax';
import {eventEmmiter} from '../modules/event-emmiter';
import {checkLogin, checkPassword} from '../modules/validation';
import {loginURL, signupURL, checkURL, logoutURL, mainROUTE} from '../config/urls';
import {Events} from '../config/events';

/**
 * Класс
 */
class UserStore {
    #state = {
        loginName: 'login',
        number: '+7(999)000-00-00',
        imgSrc: '',
        isAuth: false,
    };

    /**
     *
     */
    constructor() {
        this.registerEvents();
    }

    /**
     *
     */
    get isAuth() {
        return this.#state.isAuth;
    }

    /**
     *
     */
    get loginName() {
        return this.#state.loginName;
    }

    /**
     *
     */
    get number() {
        return this.#state.number;
    }

    /**
     *
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case UserActionsType.CHECK_SESSION:
                this.checkSession();
                break;
            case UserActionsType.LOGIN:
                this.login(action.payload.login, action.payload.password);
                break;
            case UserActionsType.SIGNUP:
                this.signup(
                    action.payload.login,
                    action.payload.password,
                    action.payload.repeatPassword,
                );
                break;
            case UserActionsType.VALIDATE_LOGIN:
                this.validateLogin(action.payload.login);
                break;
            case UserActionsType.VALIDATE_PASSWORD:
                this.validatePassword(action.payload.password);
                break;
            case UserActionsType.VALIDATE_REPEAT_PASSWORD:
                this.validateRepeatPassword(
                    action.payload.password,
                    action.payload.repeatPassword,
                );
                break;
            case UserActionsType.LOGOUT:
                this.logout();
                break;
            case UserActionsType.GET_ADDRESSES:
                this.getAddresses();
            default:
                break;
            }
        });
    }

    /**
     *
     */
    async checkSession() {
        const [statusCode,] = await Ajax.prototype.getRequest(checkURL);
        switch (statusCode) {
        case 200:
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.USER_IS_AUTH, {url: mainROUTE});
            break;
        case 401:
            this.#state.isAuth = false;
            eventEmmiter.emit(Events.USER_IS_NOT_AUTH, {url: mainROUTE});
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, 'Ошибка. Попробуйте позже');
            break;
        default:
            break;
        }
    }

    /**
     *@param {String} login
     *@param {String} password
     */
    async login(login, password) {
        const [statusCode, body] = await Ajax.prototype.postRequest(loginURL, {
            login,
            password,
        });
        switch (statusCode) {
        case 200:
            this.#state.loginName = login;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_LOGIN);
            break;
        case 400:
            eventEmmiter.emit(Events.LOGIN_FORM_ERROR, 'Неверный логин или пароль');
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    /**
     *@param {String} login
     *@param {String} password
     *@param {String} repeatPassword
     */
    async signup(login, password, repeatPassword) {
        const isValidLogin = this.validateLogin(login);
        const isValidPassword = this.validatePassword(password);
        const isValidRepeatPassword = this.validateRepeatPassword(
            password,
            repeatPassword,
        );

        if (!(isValidLogin && isValidPassword && isValidRepeatPassword)) {
            return;
        }

        const [statusCode, body] = await Ajax.prototype.postRequest(signupURL, {
            login,
            password,
        });
        switch (statusCode) {
        case 200:
            this.#state.loginName = login;
            this.#state.isAuth = true;
            eventEmmiter.emit(Events.SUCCESSFUL_SIGNUP);
            break;
        case 400:
            eventEmmiter.emit(
                Events.SIGNUP_FORM_ERROR,
                'Такой логин уже существует',
            );
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
        }
    }

    /**
     *@param {String} login
     *@return {Boolean}
     */
    validateLogin(login) {
        const [error, isValidLogin] = checkLogin(login);
        if (!isValidLogin) {
            eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@return {Boolean}
     */
    validatePassword(password) {
        const [error, isValidPassword] = checkPassword(password);
        if (!isValidPassword) {
            eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
            return false;
        }
        eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
        return true;
    }

    /**
     *@param {String} password
     *@param {String} repeatPassword
     *@return {Boolean}
     */
    validateRepeatPassword(password, repeatPassword) {
        if (password !== repeatPassword) {
            eventEmmiter.emit(
                Events.REPEAT_PASSWORD_INPUT_ERROR,
                'Пароли не совпадают',
            );
            return false;
        }
        return true;
    }

    /**
     *
     */
    async logout() {
        this.#state.loginName = '';
        this.#state.isAuth = false;
        Ajax.prototype.getRequest(logoutURL);
        eventEmmiter.emit(LOGOUT, {url: mainROUTE});
    }

    /**
     *
     */
    async getAddresses() {
        // Ajax
        console.log('addresses get');
        const addresses = [
            {id: 1, city: 'Москва', street: 'ул. Малая', house: '87', flat: '356', isCurrent: true},
            {id: 2, city: 'Москва', street: 'ул. Большая', house: '89', flat: '12',
                isCurrent: false}];
        eventEmmiter.emit(Events.SUCCESSFUL_GET_ADDRESSES, addresses);
    }
}

export const userStore = new UserStore();
