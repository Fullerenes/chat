import React, { Component } from 'react'
import NavigationStyled from './style'
class Navigation extends Component {
    render() {
        return (
            <NavigationStyled>
                {this.props.children}
            </NavigationStyled>
        )
    }
}
export default Navigation;