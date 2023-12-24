import {wsUrl} from '../config/urls';

/**
 * Класс для работы с Web Socket
 */
export default class WS {
    socket;
    timerId;

    /**
     * Конструктор класса
     * @param {Function} handle Обработчик получения сообщения
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
     * Пинг для сохранения соединия Web Socket
     */
    keepAlive() {
        this.timerId = setInterval(() => {
            if (this.socket.readyState == this.socket.OPEN) {
                this.socket.send('');
            }
        }, 6000);
    }

    /**
     * Закрытие Web Socket
     */
    closeSocket() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.socket.close();
    }

    keepAlive = this.keepAlive.bind(this);
    closeSocket = this.closeSocket.bind(this);
}

