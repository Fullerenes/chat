import { chatActions, roomsActions } from '../actions'
import _pickBy from 'lodash/pickBy';
import _isNumber from 'lodash/isNumber';
/*
  const exampleState = {
    rooms: {
        'room123123':[
            {
                "id": 1,
                "nickname": "Service",
                "time": 1543101082704,
                "message": "First Message",
                "owner": 0,
                "edited": false
            }
        ]
    },
    
    messages: []
};  
*/
const initialState = {
    rooms: [],
    messages: {},
    connected: false,
    currentRoom: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case roomsActions.FETCH_ROOMS: {
            console.log(action.payload);
            if (action.payload.length) {
                return {
                    ...state,
                    rooms: action.payload
                }
            } else {
                return state
            }
        }
        case roomsActions.USER_JOIN: {
            console.log('USER_JOIN')
            console.log(action.payload);
            const { nickname, roomId, userId } = action.payload;
            const rooms = state.rooms.map(room => {
                let newRoom = room;
                console.log(newRoom);
                if (room.id === roomId) {
                    newRoom = { ...room, currentUsers: { ...room.currentUsers, [userId]: nickname } }
                }
                return newRoom
            });
            return {
                ...state,
                rooms
            }
        }
        case roomsActions.USER_LEFT: {
            console.log('USER_LEFT');
            console.log(action.payload);
            const { roomId, userId } = action.payload;
            const rooms = state.rooms.map(room => {
                let newRoom = room;

                if (room.id === roomId) {
                    newRoom = { ...room, currentUsers: _pickBy(room.currentUsers, (value, key) => { console.log(value, key, userId); return parseInt(key) !== userId; }) }
                }
                return newRoom
            });
            return {
                ...state,
                rooms
            }
        }
        case roomsActions.JOINED_ROOM: {
            const roomId = action.payload.roomId;
            const rooms = state.rooms.map(room => {
                if (room.id === roomId)
                    room.joined = true;
                return room
            });
            return {
                ...state,
                rooms
            };
        }
        case roomsActions.LEFT_ROOM: {
            const roomId = action.payload.roomId;
            const rooms = state.rooms.map(room => {
                if (room.id === roomId)
                    room.joined = false;
                return room
            });
            return {
                ...state,
                rooms
            };
        }
        case chatActions.CONNECT_SUCCESS: {
            return {
                ...state,
                connected: true
            }
        }
        case chatActions.DISCONNECT: {
            return {
                ...state,
                connected: false
            }
        }
        case chatActions.FETCH_ROOM_MESSAGES: {
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.roomId]: action.payload.messages
                }
            }
        }
        case chatActions.RECIVE_MESSAGE: {
            console.log('RECIVE_MESSAGE');
            console.log(action);
            const roomId = action.payload.roomId;
            const message = action.payload.message;
            let messageObj = {};
            if (state.messages[roomId]) {
                messageObj = { [roomId]: [...state.messages[roomId], message] };
            } else {
                messageObj = { [roomId]: [message] };
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    ...messageObj
                }
            };
        }
        case chatActions.SEND_MESSAGE: {
            // return {
            //     messages: [
            //         ...state.messages,
            //         action.payload.message
            //     ]
            // }
            return state;
        }
        default:
            return state;
    }
};