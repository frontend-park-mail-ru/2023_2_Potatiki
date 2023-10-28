import { AppDispatcher } from "../modules/dispatcher";

export const UserActionsType = {
  START: 'START',
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
  LOGOUT: 'LOGOUT',
  GET_PROFILE: 'GET_PROFILE',
  VALIDATE_LOGIN: 'VALIDATE_LOGIN',
  VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
  VALIDATE_REPEAT_PASSWORD: 'VALIDATE_REPEAT_PASSWORD',
};

export const UserActions = {
  start() {
    AppDispatcher.dispatch({
      type: UserActionsType.START,
      payload: {},
    });
  },

  login(login, password) {
    console.log('dispatch');
    AppDispatcher.dispatch({
      type: UserActionsType.LOGIN,
      payload: {
        login: login,
        password: password,
      },
    });
  },

  validateLogin(login) {
    AppDispatcher.dispatch({
      type: UserActionsType.VALIDATE_LOGIN,
      payload: {
        login: login,
      },
    });
  },

  validatePassword(password) {
    AppDispatcher.dispatch({
      type: UserActionsType.VALIDATE_PASSWORD,
      payload: {
        password: password,
      },
    });
  },

  validateRepeatPassword(password, reapeatPassword) {
    AppDispatcher.dispatch({
      type: UserActionsType.VALIDATE_PASSWORD,
      payload: {
        password: password,
        reapeatPassword: reapeatPassword,
      },
    });
  },

  signup(login, password, repeatPassword) {
    AppDispatcher.dispatch({
      type: UserActionsType.SIGNUP,
      payload: {
        login: login,
        password: password,
        repeatPassword: repeatPassword,
      },
    });
  },

  getProfile(login, password) {
    AppDispatcher.dispatch({
      type: UserActionsType.GET_PROFILE,
      payload: {
        login: login,
        password: password,
      },
    });
  },

  logout() {
    AppDispatcher.dispatch({
      type: UserActionsType.LOGOUT,
      payload: {
        login: login,
        password: password,
      },
    });
  },
};
