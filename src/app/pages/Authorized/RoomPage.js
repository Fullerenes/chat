import React, { Component } from 'react'
import Room from '../../components/Room';

export default class RoomPage extends Component {
  render() {
    const roomId = parseInt(this.props.match.params.id);
    return (
      <Room roomId={roomId} />
    )
  }
}
