import React, { Component } from 'react';
import { connect } from 'react-redux';

import { listenerActions } from '../../../store/actions/';

import MessagesListStyled, { MessagesWindowStyled } from './style';

import Message from '../Message';

class MessageList extends Component {
    scrollToBottom() {
        //this.messagesEnd.scrollIntoView();
        //this.wrapper.scrollTop()
        //console.log(this.wrapper.scrollTo);
        this.messagesWindow.scrollTop = this.messagesList.scrollHeight;
    }
    componentDidMount() {
        this.scrollToBottom();
        const { dispatch } = this.props;
        this.interval = setInterval(() => {
            dispatch({
                type: listenerActions.FETCH_MESSAGES_REQUEST
            })
        }, 1000);
        dispatch({
            type: listenerActions.FETCH_MESSAGES_REQUEST
        })

    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        let { messages } = this.props;
        return (
            <MessagesWindowStyled ref={el => this.messagesWindow = el}>
                <MessagesListStyled ref={el => this.messagesList = el} id="windowList">
                    {messages.map((message) => (
                        <Message key={message.id} {...message} />))}
                </MessagesListStyled>
            </MessagesWindowStyled>
        )
    }
}

const enhance = connect(state => ({
    messages: state.MessagesReducer.messages
}))

export default enhance(MessageList);