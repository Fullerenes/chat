import { userActions } from '../actions'

const initialState = {
    nickname: "",
    userId: -1
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActions.CHANGE_NICKNAME: {
            const { nickname, userId } = action.payload;
            if (nickname && userId > -1) {
                return { nickname, userId };
            } else {
                return state;
            }
        }
        default: {
            return state;
        }

    }
}