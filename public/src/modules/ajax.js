import {baseURL} from '../../config.js';

/**
 * Методы для отправки сетевых запросов
 */
export default class Ajax {
    /**
   * POST-запрос
   * @param {String} url Путь запроса
   * @param {Object} data Тело запроса
   * @return {Object} Ответ с сервера
   */
    async postRequest(url, data) {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(baseURL + url, options);
            const body = await response.json();
            return [response.status, body];
        } catch (error) {
            return [500, error];
        }
    }

    /**
   * GET-запрос
   * @param {String} url Путь запроса
   * @return {Object} Ответ с сервера
   */
    async getRequest(url) {
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Accept': 'application/json',
                'Access-Control-Request-Method': 'GET',
            },
        };
        try {
            const response = await fetch(baseURL + url, options);
            const body = await response.json();
            return [response.status, body];
        } catch (error) {
            return [500, error];
        }
    }
}
