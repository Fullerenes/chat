import { call, put, take, cancelled, cancel, takeEvery, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { fetchRoomMessages as fetchRoomMessagesAPI, joinRoom as joinRoomAPI, leaveRoom as leaveRoomAPI, send, connect, changeNickname as changeNicknameAPI } from '../api'
import { roomsActions, chatActions, errorActions, listenerActions, userActions, usersActions } from '../actions'

function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {
        const fetchRooms = (event) => {
            const payload = event.payload.map(room => { return { ...room, joined: false } });
            const action = {
                type: roomsActions.FETCH_ROOMS,
                payload
            }
            emit(action)
        }
        const newRoom = (event) => {
            const action = {
                type: roomsActions.NEW_ROOM,
                payload: event.payload
            }
            emit(action);
        }
        const newMessage = (event) => {
            const action = {
                type: chatActions.RECIVE_MESSAGE,
                payload: event.payload
            }
            console.log('newMessage START');
            console.log(action);
            console.log('newMessage END');
            emit(action);
        }
        const joinedRoom = (event) => {
            console.log(event.payload);
            const action = {
                type: roomsActions.JOINED_ROOM,
                payload: event.payload
            }
            emit(action);
        }
        const leftRoom = (event) => {
            const action = {
                type: roomsActions.LEFT_ROOM,
                payload: event.payload
            }
            emit(action);
        }
        const roomFetchedMessages = (event) => {
            console.log('roomFetchedMessages');
            console.log(event);
            const action = {
                type: chatActions.FETCH_ROOM_MESSAGES,
                payload: event.payload
            }
            emit(action)
        }
        const nicknameChanged = (event) => {
            const action = {
                type: userActions.CHANGE_NICKNAME,
                payload: event.payload
            }
            emit(action);
        }
        const users = (event) => {
            console.log('USERS');
            console.log(event);
            const action = {
                type: usersActions.FETCH_USERS,
                payload: event.payload
            }
            emit(action);
        }
        const userJoinRoom = (event) => {
            let payload = {
                roomId: event.payload.roomId,
                userId: event.payload.userId,
                nickname: event.payload.nickname
            };
            let action = {
                type: roomsActions.USER_JOIN,
                payload
            }
            emit(action);
            payload = { message: event.payload.message, roomId: event.payload.roomId }
            action = {
                type: chatActions.RECIVE_MESSAGE,
                payload
            }
            emit(action);
        }
        const userLeftRoom = (event) => {
            let payload = {
                roomId: event.payload.roomId,
                userId: event.payload.userId,
                nickname: event.payload.nickname
            };
            let action = {
                type: roomsActions.USER_LEFT,
                payload
            }
            emit(action);
            payload = { message: event.payload.message, roomId: event.payload.roomId }
            action = {
                type: chatActions.RECIVE_MESSAGE,
                payload
            }
            emit(action);
        }
        const userOffline = (event) => {
            let payload = {
                roomId: event.payload.roomId,
                userId: event.payload.userId,
                nickname: event.payload.nickname
            };
            let action = {
                type: roomsActions.USER_OFFLINE,
                payload
            }
            emit(action);
        }
        const userChangeNickname = (event) => {
            //let payload = { message: event.payload.message, roomId: event.payload.roomId }
            // let action = {
            //     type: userActions.CHANGE_NICKNAME,
            //     payload
            // }
            //emit(action);
            let payload = { message: event.payload.message, roomId: event.payload.roomId }
            let action = {
                type: chatActions.RECIVE_MESSAGE,
                payload
            }
            console.log('userChangeNickname START');
            console.log(action);
            console.log('userChangeNickname END');
            emit(action);
        }
        const disconnectHandler = (event) => {
            emit(new Error('disconnectHandler'));
        }
        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }
        // setup the subscription
        socket.on('rooms', fetchRooms);
        socket.on('room', newRoom);
        socket.on('newMessage', newMessage);
        socket.on('roomFetchedMessages', roomFetchedMessages)
        socket.on('joinedRoom', joinedRoom);
        socket.on('leftRoom', leftRoom);
        socket.on('users', users);
        socket.on('error', errorHandler);
        socket.on('userJoinRoom', userJoinRoom);
        socket.on('userLeftRoom', userLeftRoom);
        socket.on('userOffline', userOffline);
        socket.on('disconnect', disconnectHandler);
        socket.on('nicknameChanged', nicknameChanged)
        socket.on('userChangeNickname', userChangeNickname)
        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off('rooms', fetchRooms);
            socket.off('room', newRoom);
            socket.off('newMessage', newMessage);
        }

        return unsubscribe
    })
}
function* chatListener(socket) {
    //yield takeEvery(listenerActions.CONNECT_REQUEST);
    yield takeEvery(listenerActions.JOIN_ROOM_REQUEST, joinRoom, socket);
    yield takeEvery(listenerActions.LEAVE_ROOM_REQUEST, leaveRoom, socket);
    yield takeEvery(listenerActions.FETCH_ROOM_MESSAGES_REQUEST, fetchRoomMessages, socket);
    yield takeEvery(listenerActions.SEND_MESSAGE_REQUEST, sendMessage, socket);
    yield takeEvery(listenerActions.CHANGE_NICKNAME_REQUEST, changeNickname, socket);
}
function* chatFlow() {
    const socket = yield call(connect);
    const chatTask = yield fork(chatListener, socket);
    const socketChannel = yield call(createSocketChannel, socket);
    yield put({ type: listenerActions.CONNECT_SUCCESS });
    yield put({ type: chatActions.CONNECT_SUCCESS });
    yield put({ type: userActions.CONNECTED });
    socket.emit('rooms');
    socket.emit('users');
    try {
        while (true) {
            // An error from socketChannel will cause the saga jump to the catch block
            const action = yield take(socketChannel);
            console.log(action);
            yield put(action);
        }
    } catch (err) {
        console.error('socket error:', err)
        // socketChannel is still open in catch block
        // if we want end the socketChannel, we need close it explicitly
    } finally {
        if (yield cancelled()) {
            socket.disconnect();
            yield put({ type: chatActions.DISCONNECT });
            socketChannel.close();
            yield cancel(chatTask);
        }
    }
    socket.disconnect();
    yield put({ type: chatActions.DISCONNECT });
    socketChannel.close();
    yield cancel(chatTask);
    yield fork(chatFlow);
}
function* joinRoom(socket, action) {
    try {
        yield call(joinRoomAPI, action.payload, socket)
    } catch (error) {
        yield put({
            type: errorActions.JOIN_ROOM_FAILURE,
            payload: { error }
        })
    }
}
function* leaveRoom(socket, action) {
    try {
        yield call(leaveRoomAPI, action.payload, socket)
    } catch (error) {
        yield put({
            type: errorActions.LEAVE_ROOM_FAILURE,
            payload: { error }
        })
    }
}
function* fetchRoomMessages(socket, action) {
    try {
        yield call(fetchRoomMessagesAPI, action.payload, socket)

    } catch (error) {
        yield put({
            type: errorActions.FETCH_ROOM_MESSAGES_FAILURE,
            payload: { error }
        })
    }
}
function* changeNickname(socket, action) {
    try {
        yield call(changeNicknameAPI, action.payload, socket);

    } catch (error) {
        yield put({
            type: errorActions.NICKNAME_FAILURE,
            payload: { error }
        })
    }
}
function* sendMessage(socket, action) {
    try {
        const message = yield call(send, action.payload, socket);
        yield put({
            type: chatActions.SEND_MESSAGE,
            payload: message
        })
    } catch (error) {
        yield put({
            type: errorActions.SEND_FAILURE,
            payload: { error }
        })
    }
}


export default chatFlow;