import { userActions } from '../actions'

const initialState = {
    nickname: '',
    userId: -1,
    auth: null,
    connected: false,
    wrongSession: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActions.LOGOUT: {
            return { ...initialState, auth: false, wrongSession: false };
        }
        case userActions.CHANGE_NICKNAME: {
            const { nickname, userId } = action.payload;
            if (nickname && userId > -1) {
                return { ...state, nickname, userId };
            } else {
                return state;
            }
        }
        case userActions.CONNECTED: {
            return { ...state, auth: true, wrongSession: false };
        }
        // case userActions.LOGIN_SUCCESS: {
        //     return { ...state, auth: true, wrongSession: false };
        // }
        case userActions.WRONG_SESSION: {
            return { ...state, auth: false, wrongSession: true };
        }
        default: {
            return state;
        }

    }
}