import './index.css';
import router from './src/modules/router';
import {UserActions} from './src/actions/user';
import {eventEmmiter} from './src/modules/event-emmiter';
import {Events} from './src/config/events';

document.addEventListener('DOMContentLoaded', UserActions.checkSession());
eventEmmiter.subscribe(Events.USER_IS_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.USER_IS_NOT_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.LOGOUT, router.go.bind(router));
const root = document.getElementById('root');
router.start(root);
