import { call, put, take, cancelled, cancel, takeEvery, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { fetchMessages as fetchMessagesAPI, send, connect } from '../api'
import { roomsActions, chatActions, errorActions, listenerActions } from '../actions'

function createSocketChannel(socket) {
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        const fetchRooms = (event) => {
            console.log(event);
            const action = {
                type: roomsActions.FETCH_ROOMS,
                payload: event.payload
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
            console.log(event);
            const action = {
                type: chatActions.RECIVE_MESSAGE,
                payload: event.payload
            }
            emit(action);
        }
        const enteredRoom = (event) => {
            const action = {
                type: roomsActions.ENTERED_ROOM,
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
        const errorHandler = (errorEvent) => {
            // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }

        // setup the subscription
        socket.on('rooms', fetchRooms);
        socket.on('room', newRoom);
        socket.on('newMessage', newMessage);
        socket.on('enteredRoom', enteredRoom);
        socket.on('leftRoom', leftRoom);

        socket.on('error', errorHandler);

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
            socket.off('rooms', fetchRooms);
            socket.off('room', newRoom);
        }

        return unsubscribe
    })
}
function* chatListener(socket) {
    //yield takeEvery(listenerActions.CONNECT_REQUEST);
    console.log(socket);
    yield takeEvery(listenerActions.SEND_MESSAGE_REQUEST, sendMessage, socket);
}
function* chatFlow() {
    const socket = yield call(connect);
    yield put({ type: listenerActions.CONNECT_SUCCESS });
    const chatTask = yield fork(chatListener, socket);
    const socketChannel = yield call(createSocketChannel, socket);
    socket.emit('rooms');
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
            socketChannel.close();
            yield cancel(chatTask);
        }
    }
}
function* fetchMessages() {
    try {
        const messages = yield call(fetchMessagesAPI)
        yield put({
            type: chatActions.FETCH_MESSAGES,
            payload: messages
        })
    } catch (error) {
        yield put({
            type: errorActions.FETCH_FAILURE,
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