import React from 'react';
import MainWindowTitleStyled, { MainWindowTitleBoxStyled } from './style';
import Nickname from '../Nickname'
function MainWindowTitle(props) {
    return (
        <MainWindowTitleStyled><MainWindowTitleBoxStyled>Super Chat</MainWindowTitleBoxStyled><Nickname /></MainWindowTitleStyled>
    )
}
export default MainWindowTitle;