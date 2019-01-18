import { call, take, fork, put, cancel } from 'redux-saga/effects'
import userSaga from './user'
import chatSaga from './chat'
import listenerSaga from './listener'
import { listenerActions, errorActions, userActions } from '../actions'

function* rootSaga() {
    while (true) {
        const loginCheckTask = yield fork(userSaga.LoginCheck);
        const registrationTask = yield fork(userSaga.Registration);
        const loginTask = yield fork(userSaga.Login);
        console.log('USER_LOGIN_SUCCESS WAIT');
        yield take([listenerActions.USER_LOGIN_SUCCESS, listenerActions.USER_REGISTRATION_COMPLETE]);
        const chat = yield fork(chatSaga);
        yield put({ type: userActions.LOGIN_SUCCESS })
        console.log('USER_LOGIN_SUCCESS TAKEN');
        yield cancel(loginTask);
        yield cancel(loginCheckTask);
        yield cancel(registrationTask);
        const listener = yield fork(listenerSaga);
        console.log('LOGOUT WAIT');
        yield take([listenerActions.USER_LOGOUT_REQUEST, errorActions.LOGIN_FAILURE]);
        console.log('LOGOUT NOT WAIT');
        yield cancel(listener);
        yield cancel(chat);
        yield call(userSaga.Logout);
    }
}

export default rootSaga
