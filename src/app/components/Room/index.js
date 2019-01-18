import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose';
import MainWindowTitle from '../../components/MainWindowTitle';
import MessagesList from '../../components/MessagesList';
import { listenerActions } from '../../../store/actions'
import MessageForm from '../../components/MessageForm';
import Loader from '../../components/Loader'
import RoomUsersList from '../RoomUsersList';
const LoaderEnchance = compose(
    connect(),
    lifecycle({
        componentDidMount() {
            const { dispatch, roomId } = this.props;
            dispatch({
                type: listenerActions.JOIN_ROOM_REQUEST,
                payload: {
                    roomId
                }
            });
        }
    })
)
const LoaderCom = LoaderEnchance(Loader);
class Room extends Component {
    render() {
        const { roomId, rooms } = this.props;
        const room = rooms.find(room => room.id === roomId);
        let name;
        let joined = false;
        if (room) {
            name = room.name;
            joined = room.joined;
        }
        return (
            room
                ? joined
                    ? <Fragment>
                        <RoomUsersList roomId={roomId} />
                        <MainWindowTitle roomId={roomId} name={name} />
                        <MessagesList roomId={roomId} />
                        <MessageForm roomId={roomId} />
                    </Fragment>
                    : <LoaderCom roomId={roomId} />
                : <Loader />
        )
    }
}

const enhance = connect(state => ({
    rooms: state.ChatReducer.rooms
}))
export default enhance(Room);