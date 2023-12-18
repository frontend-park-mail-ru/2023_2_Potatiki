import {wsUrl} from '../config/urls';

/**
 *
 */
export default class WS {
    socket;

    /**
     *
     */
    constructor() {
        this.socket = new WebSocket(wsUrl);
        this.socket.onopen = function(e) {
            console.log('succes');
        };

        this.socket.onmessage = function(event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        this.socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code}
                причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };

        this.socket.onerror = function(error) {
        };
    }
}

