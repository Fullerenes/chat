import { takeEvery, take, cancelled } from 'redux-saga/effects'
import { listenerActions } from '../actions'
import userSaga from './user'

function* listenerSaga() {
    try {
        yield takeEvery(listenerActions.CONNECT_SUCCESS, () => { console.log('CONNECT_SUCCESS') });

        //NICKNAME

        yield take(listenerActions.LISTENER_CANCEL);
    } catch (error) {
        console.error(error);
    } finally {
        if (yield cancelled()) {
            console.log('listenerSaga cancelled');
        }
    }
    console.log('listenerSaga');
    // LISTING
    //yield takeEvery(listenerActions.CONNECT_REQUEST, messagesSaga.flow);
    //yield takeEvery(listenerActions.CONNECT_SUCCESS, () => { console.log('CONNECT_SUCCESS') });

    //MESSAGES
    //yield takeEvery(listenerActions.FETCH_MESSAGES_REQUEST, messagesSaga.fetchMessages);
    // yield takeEvery(listenerActions.SEND_MESSAGE_REQUEST, messagesSaga.sendMessage);


}

export default listenerSaga