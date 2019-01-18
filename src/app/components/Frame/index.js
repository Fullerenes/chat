import React, { Component } from 'react'
import FrameStyled, { FrameContent } from './style'
import MainWindow from '../MainWindow'
import Sidebar from '../Sidebar'
import Toolbar from '../Toolbar'
class Frame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: false
        };
        this.handleSidebar = this.handleSidebar.bind(this);
    }
    handleSidebar = (open) => {
        let sidebar = false;
        if (open !== undefined) {
            sidebar = open;
        } else {
            sidebar = !this.state.sidebar;
        }
        this.setState({ sidebar })
    }
    render() {
        const { auth } = this.props
        return (
            <FrameStyled>
                <Toolbar auth={auth} handleSidebar={this.handleSidebar} />
                <FrameContent>
                    <Sidebar handleSidebar={this.handleSidebar} opened={this.state.sidebar && "opened"} />
                    <MainWindow>
                        {this.props.children}
                    </MainWindow>
                </FrameContent>
            </FrameStyled>
        )
    }
}
//<MainWindow />
export default Frame;