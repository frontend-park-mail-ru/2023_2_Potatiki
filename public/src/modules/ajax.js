import {baseUrl} from '../config/urls';

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
    async postRequest(url, data, token) {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            exposedHeaders: '*',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        };
        if (token) {
            options.headers['X-Csrf-Token'] = token;
        }
        console.log(token, options);
        try {
            const response = await fetch(baseUrl + url, options);
            const body = await response.text();
            if (!body) {
                return [response.status, {}];
            }
            return [response.status, JSON.parse(body)];
        } catch (error) {
            return [429, error];
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
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Request-Method': 'GET',
            },
        };
        try {
            const response = await fetch(baseUrl + url, options);
            const body = await response.text();
            if (!body) {
                return [response.status, {}];
            }
            return [response.status, JSON.parse(body)];
        } catch (error) {
            return [429, error];
        }
    }

    async getCSRFRequest(url) {
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            exposedHeaders: '*',
            headers: {
                // 'Content-Type': 'text/plain',
                // 'Accept': '*/*',
                // 'Access-Control-Request-Method': 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Request-Method': 'GET',
            },
        };
        try {
            const response = await fetch(baseUrl + url, options);
            console.log(response);
            console.log(response.headers);
            console.log(response.headers.get('Content-type'));
            return [response.status, response.headers.get('X-Csrf-Token')];
        } catch (error) {
            return [429, error];
        }
    }

    /**
   * DELETE-запрос
   * @param {String} url Путь запроса
   * @param {Object} data Тело запроса
   * @return {Object} Ответ с сервера
   */
    async deleteRequest(url, data, token) {
        const options = {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        };
        if (token) {
            options.headers['X-Csrf-Token'] = token;
        }
        console.log(token, options);
        try {
            const response = await fetch(baseUrl + url, options);
            const body = await response.text();
            if (!body) {
                return [response.status, {}];
            }
            return [response.status, JSON.parse(body)];
        } catch (error) {
            return [429, error];
        }
    }
}
