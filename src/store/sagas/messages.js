import { call, put } from 'redux-saga/effects'
import { fetchMessages as fetchMessagesAPI, send } from '../api/'
import { messagesActions, errorActions } from '../actions'

function* fetchMessages() {
    try {
        const messages = yield call(fetchMessagesAPI)
        yield put({
            type: messagesActions.FETCH_MESSAGES,
            payload: messages
        })
    } catch (error) {
        yield put({
            type: errorActions.FETCH_FAILURE,
            payload: { error }
        })
    }
}
function* sendMessage(action) {
    try {
        const message = yield call(send, action.payload);
        yield put({
            type: messagesActions.SEND_MESSAGE,
            payload: message
        })
    } catch (error) {
        yield put({
            type: errorActions.SEND_FAILURE,
            payload: { error }
        })
    }
}

export default {
    fetchMessages,
    sendMessage
}