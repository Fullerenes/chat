import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import ChatReducer from './ChatReducer';
import UserReducer from './UserReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    ChatReducer,
    UserReducer
})
