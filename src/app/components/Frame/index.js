import React, { Component } from 'react'
import FrameStyled from './style'
import MainWindow from '../MainWindow'
import Sidebar from '../Sidebar'
class Frame extends Component {
    render() {
        return (
            <FrameStyled>
                <Sidebar />
                <MainWindow>
                    {this.props.children}
                </MainWindow>
            </FrameStyled>
        )
    }
}
//<MainWindow />
export default Frame;