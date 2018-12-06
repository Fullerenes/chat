import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenerActions } from '../../../store/actions'
import RoomsList from '../../components/RoomsList';
class Rooms extends Component {
    handleConnect = () => {
        const { dispatch } = this.props;
        dispatch({
            type: listenerActions.CONNECT_REQUEST
        })
    }
    render() {
        return (
            <div>
                <RoomsList />
                <button onClick={this.handleConnect}>Connect</button>
            </div>
        )
    }
}
const enhance = connect(state => ({
    auth: state.UserReducer.auth
}))

export default enhance(Rooms);
