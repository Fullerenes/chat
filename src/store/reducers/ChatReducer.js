import { chatActions, roomsActions } from '../actions'
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
    messages: {}
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
        case chatActions.FETCH_MESSAGES: {
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
                messages:{
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