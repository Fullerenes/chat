import { messagesActions } from '../actions'

const initialState = {
    messages: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case messagesActions.FETCH_MESSAGES: {
            if (action.payload.length)
                return {
                    messages: [
                        ...action.payload
                    ]
                }
            else {
                return state;
            }
        }
        case messagesActions.SEND_MESSAGE: {
            return {
                messages: [
                    ...state.messages,
                    action.payload.message
                ]
            }
        }
        default:
            return state;
    }
};