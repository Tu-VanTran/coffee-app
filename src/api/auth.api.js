const { API, URL_API } = require("./const.api");

export const AuthAPI = {
    login:(data) => API.post(`${URL_API}/auth/login`, data),
    register:(data) => API.post(`${URL_API}/auth/register`, data)
}