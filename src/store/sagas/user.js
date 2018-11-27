import { put, call } from 'redux-saga/effects'
import { userActions, errorActions } from '../actions'
import { changeUserName } from '../api'
function* changeNickname(action) {
    try {
        const { nickname, userId } = yield call(changeUserName, action.payload.nickname);
        yield put({
            type: userActions.CHANGE_NICKNAME,
            payload: { nickname, userId }
        })
    } catch (error) {
        yield put({
            type: errorActions.NICKNAME_FAILURE,
            payload: { error }
        })
    }
}
export default {
    changeNickname
}