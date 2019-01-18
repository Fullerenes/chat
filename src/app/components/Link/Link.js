import React from 'react'
import LinkStyled from './style'
export default function Link({ children, ...props }) {
    return (
        <LinkStyled {...props}>{children}</LinkStyled>
    )
}
