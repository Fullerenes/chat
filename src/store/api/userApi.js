import axios from 'axios';

const userFetch = (answer) => {
    if (answer.error.error) {
        logout();
    }
    return answer;
}
export const loginApi = (login, password) => {
    return axios.post('/api/login',
        { login, password })
        .then(response => response.data)
        .then(answer => userFetch(answer));
}
export const registration = (login, password) => {
    return axios.post('/api/registration',
        { login, password })
        .then(response => response.data)
        .then(answer => userFetch(answer));
}
export const loginCheck = () => {
    return axios.post('/api/user',
        {})
        .then(response => response.data)
        .then(answer => userFetch(answer));
}
export const changeUserName = (newName) => {
    const nickname = newName;
    return axios.post('/api/user',
        { nickname })
        .then(response => response.data)
        .then(answer => userFetch(answer));
}
export const logout = () => {
    return axios.post('/api/logout',
        {})
        .then(response => response.data)
        .then(answer => userFetch(answer));
}