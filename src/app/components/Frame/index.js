import React from 'react';
import {Helmet} from "react-helmet";
import FrameStyled from './style';

import MainWindow from '../MainWindow';

function Frame(props) {
    return (
        <FrameStyled>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Super Chat</title>
                
            </Helmet>
            <MainWindow />
        </FrameStyled>
    )
}

export default Frame