import './index.scss';
import router from './src/modules/router';
import {UserActions} from './src/actions/user';
import {eventEmmiter} from './src/modules/event-emmiter';
import {Events} from './src/config/events';
import {cartStore} from './src/stores/cart';
import {productsStore} from './src/stores/products';
import {userStore} from './src/stores/user';
import {renderServerMessage, renderWarningMessage} from './src/modules/server-message';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
        .then((reg) => {
            console.log('sw registered', reg);
        })
        .catch((e) => {
            console.error(e);
        });
}

const ustore = userStore;
const cstore = cartStore;
const pstore = productsStore;

if (navigator.onLine) {
    UserActions.setOnline();
} else {
    UserActions.setOffline();
}

window.addEventListener('online', UserActions.setOnline);
window.addEventListener('offline', UserActions.setOffline);
document.addEventListener('DOMContentLoaded', UserActions.checkSession());
eventEmmiter.subscribe(Events.USER_IS_AUTH, router.go.bind(router));
eventEmmiter.subscribe(Events.LOGOUT, router.go.bind(router));
eventEmmiter.subscribe(Events.SERVER_MESSAGE, renderServerMessage);
eventEmmiter.subscribe(Events.WARN_MESSAGE, renderWarningMessage);
const root = document.getElementById('container-main');
router.start(root);
