import { usersActions } from '../actions'

const initialState = {
    users: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case usersActions.FETCH_USERS: {
            return { users: [...action.payload.users] };
        }
        default:
            return state;
    }
};