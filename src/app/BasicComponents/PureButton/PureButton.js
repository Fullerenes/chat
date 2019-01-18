import React from 'react'
import Button from './style'
export default function PureButton({children, ...props}) {
    return (
        <Button {...props}>{children}</Button>
    )
}
