import {wsUrl} from '../config/urls';

/**
 *
 */
export default class WS {
    socket;
    timerId;

    /**
     *
     */
    constructor(handle) {
        this.socket = new WebSocket(wsUrl);
        this.socket.onopen = function(e) {};

        this.socket.onmessage = function(event) {
            handle(JSON.parse(event.data));
        };

        this.socket.onclose = function(event) {
        };

        this.socket.onerror = function(error) {};
    }

    /**
     *
     */
    keepAlive() {
        this.timerId = setInterval(() => {
            if (this.socket.readyState == this.socket.OPEN) {
                this.socket.send('');
            }
        }, 6000);
    }

    /**
     *
     */
    closeSocket() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.socket.close();
    }

    keepAlive = this.keepAlive.bind(this);
}

