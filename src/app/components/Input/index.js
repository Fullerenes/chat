import React, { Component } from 'react'
import InputStyled from './style'


export default class Input extends Component {
    render() {
        return (
            <InputStyled {...this.props} />
        )
    }
}
