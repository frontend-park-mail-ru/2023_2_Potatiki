import './index.css';
import {config} from './config.js';
import router from './src/modules/router';

const root = document.getElementById('root');
router.start(root, config);
router.go({url: location.pathname});
