import React, { Component } from 'react'
import ServiceMessageStyled, { ServiceMessageTimeStyled } from './style';
class ServiceMessage extends Component {
    constructor(props) {
        super(props);
        let T = new Date(props.time);
        this.messageTime = `${T.getDate()}.${(T.getMonth() + 1)}.${T.getFullYear()} ${T.getHours()}:${T.getMinutes()}`;
        //this.messageTime = new Date(props.time);
    }
    render() {
        return (
            <ServiceMessageStyled>
                <ServiceMessageTimeStyled>{this.messageTime}</ServiceMessageTimeStyled>
                {this.props.message}
            </ServiceMessageStyled>
        )
    }
}
export default ServiceMessage;