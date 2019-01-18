import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'
import Navigation from '../Navigation'
import Button from '../Button';
import RoomsList from '../RoomsList';
import UsersList from '../UsersList';

class SidebarAuthorized extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch({
            type: listenerActions.USER_LOGOUT_REQUEST
        })
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleLogout}>Logout</Button>
                <Navigation>
                    <Link to="/">Rooms</Link>
                </Navigation>
                <RoomsList />
                <UsersList />
            </div>
        )
    }
}
const enhance = connect(state => ({
    nickname: state.User.nickname
}))
export default enhance(SidebarAuthorized);