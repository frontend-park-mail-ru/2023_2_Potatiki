import {baseURL} from '../../config';

/**
 *
 */
export default class Ajax {
    /**
   *
   * @param {*} url
   * @param {*} data
   * @returns
   */
    async postRequest(url, data) {
        const options = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
   *
   * @param {String} url
   * @returns
   */
    async getRequest(url) {
        const options = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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
