import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import MainWindowTitle from '../../components/MainWindowTitle';
import MessagesList from '../../components/MessagesList';
import MessageForm from '../../components/MessageForm';

class Room extends Component {
  render() {
    return (
      <Fragment>
        {this.props.rooms.map((room, index) => {
          return <li key={index}>{room.name}</li>
        })}

        <MainWindowTitle />
        <MessagesList roomId={parseInt(this.props.match.params.id)} />
        <MessageForm roomId={parseInt(this.props.match.params.id)} />
      </Fragment>
    )
  }
}
const enhance = connect(state => ({
  rooms: state.ChatReducer.rooms
}))
export default enhance(Room);