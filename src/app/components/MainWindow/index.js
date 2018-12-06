import React from 'react';
import MainWindowStyled from './style';



function MainWindow(props) {
    return (
        <MainWindowStyled>
            {props.children}
        </MainWindowStyled>
    )
}
export default MainWindow;