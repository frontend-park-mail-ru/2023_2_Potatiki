import './index.css';
import {config} from './config.js';
import router from './src/modules/router';

/**
 * Listener для нажатий по ссылкам
 * @param {Event} event Событие нажатия по ссылке
 */
const listenClick = (event) => {
    event.preventDefault();
    const anchor = event.target.closest('a');
    if (!anchor) return;
    router.go({url: anchor.getAttribute('href')});
};

const root = document.getElementById('root');
router.start(root, config);
window.addEventListener('click', listenClick);
router.go({url: location.pathname});
