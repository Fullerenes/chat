import { put, call, take } from 'redux-saga/effects'
import { userActions, errorActions, listenerActions } from '../actions'
import { changeUserName, loginApi, loginCheck, logout, registration } from '../api'
function* changeNickname(action) {
    try {
        console.log('changeNickname');
        const answer = yield call(changeUserName, action.payload.nickname);
        if (!answer.error.error) {
            const { nickname, userId } = answer.data;
            yield put({
                type: userActions.CHANGE_NICKNAME,
                payload: { nickname, userId }
            })
        } else {
            yield put({
                type: userActions.LOGOUT
            });
        }
    } catch (error) {
        yield put({
            type: errorActions.NICKNAME_FAILURE,
            payload: { error }
        })
    }
}
function* LoginCheck() {
    try {
        yield put({ type: listenerActions.USER_LOGINCHECK_REQUEST });
        const answer = yield call(loginCheck);
        if (!answer.error.error) {
            const { nickname, userId } = answer.data;
            yield put({
                type: userActions.CHANGE_NICKNAME,
                payload: { nickname, userId }
            });
            yield put({
                type: listenerActions.USER_LOGIN_SUCCESS
            });
            return true;
        } else {
            yield put({ type: userActions.WRONG_SESSION });
            return false;
        }
    } catch (error) {
        yield put({
            type: errorActions.LOGIN_CHECK_FAILURE,
            payload: { error }
        })
    }
}
function* Login() {
    try {
        const action = yield take(listenerActions.USER_LOGIN_REQUEST);
        const { login, password } = action.payload;
        const answer = yield call(loginApi, login, password);
        if (!answer.error.error) {
            const { nickname, userId } = answer.data;
            yield put({
                type: userActions.CHANGE_NICKNAME,
                payload: { nickname, userId }
            });
            yield put({
                type: listenerActions.USER_LOGIN_SUCCESS
            });
            return true;
        } else {
            throw new Error(answer.error.errorMessage);
        }
    } catch (error) {
        yield put({
            type: errorActions.LOGIN_FAILURE,
            payload: { error }
        })
        return false;
    }
}
function* Logout() {
    try {
        const answer = yield call(logout);
        if (!answer.error.error) {
            yield put({
                type: userActions.LOGOUT
            });
            return true;
        } else {
            throw new Error('Logout Failure');
        }
    } catch (error) {
        yield put({
            type: errorActions.LOGOUT_FAILURE,
            payload: { error }
        })
    }
}
function* Registration() {
    try {
        while (true) {
            const action = yield take(listenerActions.USER_REGISTRATION_REQUEST);
            const { login, password } = action.payload;
            const answer = yield call(registration, login, password);
            if (!answer.error.error) {
                const { nickname, userId } = answer.data;
                yield put({
                    type: userActions.CHANGE_NICKNAME,
                    payload: { nickname, userId }
                });
                yield put({
                    type: listenerActions.USER_REGISTRATION_COMPLETE
                });
                return true;
            } else {
                throw new Error(answer.error.errorMessage);
            }
        }
    } catch (error) {
        yield put({
            type: errorActions.REGISTRATION_FAILURE,
            payload: { error }
        })
    }
}
export default {
    changeNickname,
    Login,
    Logout,
    LoginCheck,
    Registration
}