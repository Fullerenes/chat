import { takeEvery } from 'redux-saga/effects'
import { listenerActions } from '../actions'
import messagesSaga from './messages'
import userSaga from './user'
function* listenerSaga() {
    // LISTING

    //NICKNAME
    yield takeEvery(listenerActions.CHANGE_NICKNAME_REQUEST, userSaga.changeNickname);
    //MESSAGES
    yield takeEvery(listenerActions.FETCH_MESSAGES_REQUEST, messagesSaga.fetchMessages);
    yield takeEvery(listenerActions.SEND_MESSAGE_REQUEST, messagesSaga.sendMessage);


}

export default listenerSaga