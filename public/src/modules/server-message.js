/**
 * Отрисовка ошибки сервера
 * @param {String} msg сообщение об ошибке
 */
export default async function renderServerMessage(msg, isCorrect) {
    const msgClass = isCorrect ? 'server-msg' : 'server-msg server-error';
    const serverMsg = document.createElement('div');
    serverMsg.setAttribute('class', msgClass);
    serverMsg.textContent = msg;
    let msgDiv = document.querySelector('#msg-container');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.setAttribute('id', 'msg-container');
        document.body.appendChild(msgDiv);
    }
    msgDiv.appendChild(serverMsg);

    setTimeout(() => {
        serverMsg.remove();
    }, 5000);
}
