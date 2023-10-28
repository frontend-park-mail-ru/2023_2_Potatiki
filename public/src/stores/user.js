import { AppDispatcher } from "../modules/dispatcher";
import { UserActionsType } from "../actions/user";
import Ajax from "../modules/ajax";
import { eventEmmiter } from "../modules/event-emmiter";
import { checkLogin, checkPassword } from "../modules/validation";
import { loginURL, signupURL } from "../../config";
import { Events } from "../config/events";

export default class UserStore {
  state = {
    login: '',
    password: '',
    imgSrc: '',
    isAuth: false,
  };

  constructor() {
    this.registerEvents();
  }

  registerEvents() {
    AppDispatcher.register((action) => {
        console.log(action);
      switch (action.type) {
        case UserActionsType.START:
          this.checkSession();
          break;
        case UserActionsType.LOGIN:
            this.login(action.payload.login, action.payload.password);
          break;
        case UserActionsType.SIGNUP:
          this.signup(action.playload.login, action.payload.password, action.payload.repeatPassword);
          break;
        case UserActionsType.VALIDATE_LOGIN:
           this.validateLogin(action.playload.login);
           break;
        case UserActionsType.VALIDATE_PASSWORD:
            this.validatePassword(action.payload.password);
            break;
        case UserActionsType.VALIDATE_REPEAT_PASSWORD:
            this.validateRepeatPassword(action.payload.repeatPassword);
             break;
        case UserActionsType.LOGOUT:
            this.logout();
            break;
        case UserActionsType.GET_PROFILE:
            this.getProfile();
            break;
        default:
            break;
      }
    });
  }

  async checkSession() {
    [statusCode,] = await Ajax.prototype.getRequest(config.requests.checkSession);
    switch (statusCode) {
        case 200:
          eventEmmiter.emit(Events.USER_IS_AUTH);
          break;
        case 401:
          eventEmmiter.emit(Events.USER_IS_NOT_AUTH);
          renderMainPage(false);
          break;
        case 429:
          eventEmmiter.emit(Events.SERVER_ERROR, body.error || 'Ошибка. Попробуйте позже');
          break;
        default:
          break;
    }
    
  }

  async login(login, password) {
    [statusCode, body] = await Ajax.prototype.postRequest(loginURL, { login, password });
    switch (statusCode) {
        case 200:
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

  async signup(login, password, repeatPassword) {
    isValidLogin = this.validateLogin(login);
    isValidPassword = this.validatePassword(password);
    isValidRepeatPassword = this.validateRepeatPassword(password, repeatPassword);

    if(!(isValidLogin && isValidPassword && isValidRepeatPassword)) {
        return;
    }

    [statusCode, body] = await Ajax.prototype.postRequest(signupURL, { login, password });
    switch (statusCode) {
        case 200:
            eventEmmiter.emit(Events.SUCCESSFUL_SIGNUP);
            break;
        case 400:
            eventEmmiter.emit(Events.SIGNUP_FORM_ERROR, 'Такой логин уже существует');
            break;
        case 429:
            eventEmmiter.emit(Events.SERVER_ERROR, body);
            break;
    }
  }

  validateLogin(login) {
    const [error, isValidLogin] = checkLogin(login);
    if (!(isValidLogin)) {
        eventEmmiter.emit(Events.LOGIN_INPUT_ERROR, error);
        return false;
    }
    return true;
  }

  validatePassword(password) {
    const [error, isValidPassword] = checkPassword(password);
    if (!(isValidPassword)) {
        eventEmmiter.emit(Events.PASSWORD_INPUT_ERROR, error);
        return false;
    }
    return true;
  }

  validateRepeatPassword(password, repeatPassword) {
    if (password !== repeatPassword) {
        eventEmmiter.emit(Events.REPEAT_PASSWORD_INPUT_ERROR, 'Пароли не совпадают');
        return false;
    }
    return true;
  }
}
