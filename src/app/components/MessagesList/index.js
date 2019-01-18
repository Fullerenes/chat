import React, { Component } from 'react';
import { connect } from 'react-redux';

import { listenerActions } from '../../../store/actions/';

import MessagesListStyled, { MessagesWindowStyled } from './style';

import Message from '../Message';
import ServiceMessage from '../ServiceMessage'

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.fetched = false;
        this.messagesWindow = React.createRef();
    }
    scrollToBottom() {
        //this.messagesEnd.scrollIntoView();
        //this.wrapper.scrollTop()
        //console.log(this.wrapper.scrollTo);
        this.messagesWindow.scrollTop = this.messagesList.scrollHeight;
    }
    componentDidMount() {
        const { dispatch, roomId } = this.props;
        dispatch({
            type: listenerActions.FETCH_ROOM_MESSAGES_REQUEST,
            payload: {
                roomId
            }
        })
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const { messages, roomId } = this.props;
        const roomMessages = messages[roomId] ? messages[roomId] : [];
        console.log(roomMessages);
        if (!messages[roomId]) {
            messages[roomId] = [];
        }
        return (
            <MessagesWindowStyled ref={el => this.messagesWindow = el}>
                <MessagesListStyled ref={el => this.messagesList = el} id="windowList">
                    {roomMessages.map((message) => {
                        if (message.owner === 0) {
                            return <ServiceMessage key={message.id} {...message} />
                        } else {
                            return <Message key={message.id} {...message} />
                        }
                    })}
                </MessagesListStyled>
            </MessagesWindowStyled>
        )
    }
}

const enhance = connect(state => ({
    messages: state.ChatReducer.messages,
    connected: state.ChatReducer.connected
}))

export default enhance(MessageList);