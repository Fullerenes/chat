import axios from 'axios';
import Cookies from 'js-cookie'
export const fetchMessages = () => {
    return axios.get('/api/messages')
        .then(response => { return response.data })
        .then(messages => { return messages })
        .catch(error => console.error(error.message));

}
export const send = (mes) => {
    let { message, userId, nickname } = mes;
    return axios.post('/api/messages', { message, nickname, userId })
        .then(response => response.data)
        .then(message => ({
            message
        }));
}
export const changeUserName = (newName) => {
    let token = Cookies.get('token');
    return axios.post('/api/user',
        { token, nickname: newName })
        .then(response => response.data)
        .then(user => {
            if (user.token && token !== user.token) {
                Cookies.set('token', user.token, { expires: 7, path: '/' });
            }
            const { nickname, userId } = user;
            return { nickname, userId };
        });
}