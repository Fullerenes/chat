import React, { Component } from 'react'
import { connect } from 'react-redux'
import MessageStyled from './style';
import { MessageTimeStyled, MessageAttributsStyled, MessageNickNameStyled } from './style';
class Message extends Component {
    constructor(props) {
        super(props);
        let T = new Date(props.time);
        this.messageTime = `${T.getDate()}.${(T.getMonth() + 1)}.${T.getFullYear()} ${T.getHours()}:${T.getMinutes()}`;
        //this.messageTime = new Date(props.time);
    }
    render() {
        return (
            <MessageStyled my={this.props.userId === this.props.owner ? true : false}>
                <MessageAttributsStyled>
                    <MessageNickNameStyled>{this.props.nickname}</MessageNickNameStyled>
                    <MessageTimeStyled my={this.props.userId === this.props.owner ? true : false}>{this.messageTime}</MessageTimeStyled>
                </MessageAttributsStyled>
                {this.props.message}
            </MessageStyled>
        )
    }
}
const enhance = connect(state => ({
    userId: state.User.userId
}));
export default enhance(Message);