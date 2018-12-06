import io from 'socket.io-client';
import axios from 'axios';
import config from '../../config'

export const fetchMessages = () => {
    return axios.get('/api/messages')
        .then(response => { return response.data })
        .then(messages => { return messages })
        .catch(error => console.error(error.message));

}
export const send = (mes, socket) => {
    // let { message, userId, nickname, roomId } = mes;
    console.log(mes);
    socket.emit('message', mes);
    return mes;
    // return axios.post('/api/messages', { message, nickname, userId, roomId })
    //     .then(response => response.data)
    //     .then(message => ({
    //         message
    //     }));
}
export function connect() {
    const socket = io(config.server);
    console.log(socket);
    return new Promise(resolve => {
        socket.on('connect', () => {
            console.dir(socket);
            resolve(socket);
        });
    });
}
export function disconnect(socket) {
    return socket.disconnect();
}