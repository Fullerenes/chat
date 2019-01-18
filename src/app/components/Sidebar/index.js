import React, { Component } from 'react'
import { connect } from 'react-redux'

import SidebarStyled from './style'
import SidebarAuthorized from '../SidebarAuthorized'
import SidebarCommon from '../SidebarCommon'

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
    onClickHandle = () => {
        const { handleSidebar } = this.props;
        console.log('CLICK');
        handleSidebar(false);
    }
    render() {
        const { opened } = this.props;
        return (
            <SidebarStyled className={opened} onClick={this.onClickHandle} >
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
    auth: state.User.auth
}))
export default enhance(Sidebar);