export default class Ajax {
  #host;

  #port;

  constructor(host, port) {
    this.#host = host;
    this.#port = port;
  }

  get baseURL() {
    return `${this.#host}:${this.#port}`;
  }

  async postRequest(url, data) {
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(this.baseURL + url, options);
      const body = await response.json();
      return [response.status, body];
    } catch (error) {
      return [500, error];
    }
  }

  async getRequest(url) {
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    try {
      const response = await fetch(this.baseURL + url, options);
      const body = await response.json();
      return [response.status, body];
    } catch (error) {
      return [500, error];
    }
  }
}
