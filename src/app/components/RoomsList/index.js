import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from '../Link'
import RoomsListStyled from './style'
class RoomsList extends Component {
    render() {
        return (
            <RoomsListStyled>
                {this.props.rooms.map((room, index) => {
                    return <li key={index}><Link to={`/room/${room.id}`}>{room.name}</Link></li>
                })}
            </RoomsListStyled>
        )
    }
}
const enhance = connect(state => ({
    rooms: state.ChatReducer.rooms
}))
export default enhance(RoomsList);