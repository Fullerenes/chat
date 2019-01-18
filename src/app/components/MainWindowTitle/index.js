import React, { Component } from 'react';
import { connect } from 'react-redux'
import Link from '../Link'
import MainWindowTitleStyled from './style';
import Tabs, { Tab } from '../Tabs'
import Links from '../../routes/links'
import { listenerActions } from '../../../store/actions'
//<MainWindowTitleBoxStyled>{name ? name : 'Room Name'}</MainWindowTitleBoxStyled>
class MainWindowTitle extends Component {
    handleClose = (roomId, prevRoomLink) => (event) => {
        console.log(roomId);
        const { dispatch } = this.props;
        dispatch({
            type: listenerActions.LEAVE_ROOM_REQUEST,
            payload: {
                roomId
            }
        });
    }
    render() {
        const { roomId } = this.props;
        const joinedRooms = this.props.rooms.filter(room => room.joined === true);
        return (
            <MainWindowTitleStyled>
                <Tabs>
                    {joinedRooms.map((room, index, rooms) => {
                        let closeLink = Links.Home;
                        let className = '';
                        if (index > 0) {
                            closeLink = `${Links.Room}${rooms[index - 1].id}`
                        } else if (rooms.length > 1) {
                            closeLink = `${Links.Room}${rooms[index + 1].id}`
                        }
                        if (roomId === room.id) {
                            className = 'selected'
                        }
                        return <Tab key={index} className={className} closeLink={closeLink} handleClose={this.handleClose(room.id)}>
                            <Link to={`/room/${room.id}`}>
                                {room.name}
                            </Link>
                        </Tab>

                    })}
                </Tabs>
            </MainWindowTitleStyled>
        )
    }
}

const enhance = connect(state => ({
    rooms: state.ChatReducer.rooms
}))
export default enhance(MainWindowTitle);