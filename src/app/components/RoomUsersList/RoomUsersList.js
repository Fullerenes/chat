import React from 'react'
import { connect } from 'react-redux'
function RoomUsersList({ rooms = [], roomId, ...props }) {
    const room = rooms.find(room => room.id === roomId);
    const { currentUsers } = room;
    console.log(currentUsers);
    return (
        <div>
            <div>Current Room UsersList</div>
            {Object.keys(currentUsers).map((key, index) => {
                return <div key={index}>({currentUsers[key].online ? 'online' : 'offline'}){currentUsers[key].nickname}</div>
            })}
        </div>
    )
}

const enhance = connect(state => ({
    rooms: state.ChatReducer.rooms
}))

export default enhance(RoomUsersList);