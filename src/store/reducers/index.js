import { combineReducers } from 'redux';
import ChatReducer from './ChatReducer';
import User from './User';
import Users from './Users';
import Rooms from './Rooms';
import Messages from './Messages';
import Errors from './Errors';

export default combineReducers({
    ChatReducer,
    User,
    Users,
    Rooms,
    Messages,
    Errors
})
