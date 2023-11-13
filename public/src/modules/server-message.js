/**
 * Отрисовка сообщений
 * @param {String} msg сообщение
 */
export function renderServerMessage(msg, isCorrect) {
    const msgClass = isCorrect ? 'server-msg' : 'server-msg server-error';
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


export function removeWarningMessage() {
    const msgDiv = document.getElementById('warning-msg-container');
    if (msgDiv) {
        msgDiv.innerHTML = '';
    }
}
