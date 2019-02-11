import { errorActions } from '../actions'

const initialState = {
    error: ""
};
export default (state = initialState, action) => {
    switch (action.type) {
        case errorActions.LOGIN_FAILURE:
        case errorActions.REGISTRATION_FAILURE: {
            const error = action.payload.error || "";
            return { ...state, error };
        }
        case errorActions.CLEAN: {
            return { ...initialState };
        }
        default: {
            return state;
        }

    }
}