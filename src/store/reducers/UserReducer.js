import { userActions } from '../actions'

const initialState = {
    nickname: '',
    userId: -1,
    auth: null,
    wrongSession: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActions.LOGOUT: {
            return { ...initialState, auth: false };
        }
        case userActions.CHANGE_NICKNAME: {
            const { nickname, userId } = action.payload;
            if (nickname && userId > -1) {
                return { ...state, nickname, userId, auth: true, wrongSession: false };
            } else {
                return state;
            }
        }
        case userActions.WRONG_SESSION: {
            return { ...state, auth: false, wrongSession: true };
        }
        default: {
            return state;
        }

    }
}