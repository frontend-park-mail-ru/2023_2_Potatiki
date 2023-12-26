export const INFO_MESSAGE = 'INFO_MESSAGE';

/**
 * Отрисовка сообщений
 * @param {String} msg сообщение
 *  @param {Boolean} type Флаг для определния типа сообщения
 */
export function renderServerMessage(msg, type) {
    let msgClass;
    console.log(type);
    switch (type) {
    case undefined:
        msgClass = 'server-msg server-error';
        break;
    case true:
        msgClass = 'server-msg';
        break;
    case INFO_MESSAGE:
        msgClass = 'server-msg info-msg';
        break;
    }
    const serverMsg = document.createElement('div');
    serverMsg.setAttribute('class', msgClass);
    serverMsg.textContent = msg;
    let msgDiv = document.getElementById('quick-msg-container');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.setAttribute('id', 'quick-msg-container');
        msgDiv.setAttribute('class', 'msg-container');
        document.body.appendChild(msgDiv);
    }
    msgDiv.appendChild(serverMsg);

    setTimeout(() => {
        serverMsg.remove();
    }, 5000);
}

/**
 * Отрисовка предупреждений
 * @param {String} msg Текст сообщения
 */
export function renderWarningMessage(msg) {
    const msgClass = 'warning-message';
    const serverMsg = document.createElement('div');
    serverMsg.setAttribute('class', msgClass);
    serverMsg.textContent = msg;
    let msgDiv = document.getElementById('warning-msg-container');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.setAttribute('id', 'warning-msg-container');
        msgDiv.setAttribute('class', 'warning-container');
        document.body.appendChild(msgDiv);
    }
    msgDiv.appendChild(serverMsg);
}

/**
 * Удвление сообщения
 */
export function removeWarningMessage() {
    const msgDiv = document.getElementById('warning-msg-container');
    if (msgDiv) {
        msgDiv.innerHTML = '';
    }
}
