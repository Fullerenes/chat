import React, { Children } from 'react';
import ErrorStyled from './style'

function Error({ children, ...props }) {
    return (
        <ErrorStyled {...props}>{children}</ErrorStyled>
    )
}
export default Error;

