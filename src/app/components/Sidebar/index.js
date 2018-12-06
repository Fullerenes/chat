import React, { Component } from 'react'
import { connect } from 'react-redux'

import SidebarStyled from './style'
import SidebarAuthorized from '../SidebarAuthorized';
import SidebarCommon from '../SidebarCommon';
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.loginned();
    }
    loginned(auth = this.props.auth, wrongSession = this.props.wrongSession) {
        if ((auth && !wrongSession)) {
            this.auth = true;
        } else {
            this.auth = false;
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.loginned(nextProps.auth, nextProps.wrongSession);
        return true;
    }
    render() {
        return (
            <SidebarStyled>
                {
                    this.auth ?
                        (
                            <SidebarAuthorized />
                        ) :
                        (
                            <SidebarCommon />
                        )
                }
                {this.props.children}
            </SidebarStyled>
        )
    }
}
const enhance = connect(state => ({
    auth: state.UserReducer.auth
}))
export default enhance(Sidebar);