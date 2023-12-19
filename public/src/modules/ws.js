import {wsUrl} from '../config/urls';

/**
 *
 */
export default class WS {
    socket;

    /**
     *
     */
    constructor(handle) {
        this.socket = new WebSocket(wsUrl);
        this.socket.onopen = function(e) {
            console.log('succes');
        };

        this.socket.onmessage = function(event) {
            handle(JSON.parse(event.data));
        };

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code}
                причина=${event.reason}`);
            } else {
                console.log(`[close] Соединение прервано код=${event.code}`);
            }
        };

        this.socket.onerror = function(error) {
            console.log(error);
        };
    }
}

