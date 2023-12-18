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
        socket = new WebSocket(wsUrl);
        socket.onopen = function(e) {
            console.log('succes');
        };

        socket.onmessage = function(event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code}
                причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };
        socket.onerror = function(error) {
        };
    }
}

