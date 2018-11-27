import React from 'react';
import MainWindowStyled from './style';

import MainWindowTitle from '../MainWindowTitle';
import MessagesList from '../MessagesList';
import MessageForm from '../MessageForm';


function MainWindow(props) {
    return (
        <MainWindowStyled>
            <MainWindowTitle />
            <MessagesList />
            <MessageForm />
        </MainWindowStyled>
    )
}
export default MainWindow;