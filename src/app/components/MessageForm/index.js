import React, { Component } from 'react';
import { connect } from 'react-redux';
import { listenerActions } from '../../../store/actions/';

import MessageFormStyled from './style';

import TextArea from '../TextArea';
import Button from '../Button';

class MessageForm extends Component {
    constructor() {
        super();
        this.state = {
            message: ""
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.Submit();
    }

    Submit = () => {
        const { dispatch, nickname, userId, roomId } = this.props;
        let message = this.state.message;
        if (!message) {
            return false;
        }
        dispatch({
            type: listenerActions.SEND_MESSAGE_REQUEST,
            payload: {
                message,
                nickname,
                userId,
                roomId
            }
        })
        this.setState({ message: "" });
    }

    handleChange = (event) => {
        const message = event.target.value;
        this.setState({ message });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            this.Submit();
        }
    }

    render() {
        return (
            <MessageFormStyled onSubmit={this.handleSubmit}>
                <TextArea placeholder="Enter message..." value={this.state.message} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                <Button type="submit">Send</Button>
            </MessageFormStyled>
        )
    }
}
const enhance = connect(state => ({
    nickname: state.UserReducer.nickname,
    userId: state.UserReducer.userId
}));

export default enhance(MessageForm);


