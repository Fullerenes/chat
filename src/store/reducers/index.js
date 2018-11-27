import { combineReducers } from 'redux';

import MessagesReducer from './MessagesReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    MessagesReducer,
    UserReducer
})
