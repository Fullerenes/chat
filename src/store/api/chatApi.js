import io from 'socket.io-client';
import config from '../../config'

export const fetchRoomMessages = ({ roomId }, socket) => {
    socket.emit('fetchRoomMessages', roomId);
    return roomId;
}
export const joinRoom = ({ roomId }, socket) => {
    console.log(roomId);
    socket.emit('join', roomId);
    return roomId;
}
export const leaveRoom = ({ roomId }, socket) => {
    console.log(roomId);
    socket.emit('leave', roomId);
    return roomId;
}
export const send = (mes, socket) => {
    // let { message, roomId } = mes;
    socket.emit('message', mes);
    return mes;
    // return axios.post('/api/messages', { message, nickname, userId, roomId })
    //     .then(response => response.data)
    //     .then(message => ({
    //         message
    //     }));
}
export function changeNickname({ nickname }, socket) {
    console.log('changeNickname START');
    console.log(nickname);
    socket.emit('changeNickname', nickname);
    console.log('changeNickname END');
    return nickname;
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