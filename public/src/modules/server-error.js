/**
 * Отрисовка ошибки сервера
 * @param {String} msg сообщение об ошибке
 */
export default function renderServerError(msg) {
    const serverError = document.createElement('div');
    serverError.setAttribute('server-error');
    serverError.textContent = msg;
    document.body.appendChild(serverError);
    setTimeout(() => {
        document.body.removeChild(document.getElementById('server-error'));
    }, 5000);
}
