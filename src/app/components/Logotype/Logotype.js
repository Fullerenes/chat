import React from 'react'
import Logo, { Img, Text, Link } from './style'
import ImgSrc from './hedgehog.svg'
import Links from '../../routes/links'
export default function Logotype({ handleSidebar }) {
    const onMouseEnterHandle = (event) => {
        handleSidebar(true);
    }
    const onMouseLeaveHandle = (event) => {
        handleSidebar(false);
    }
    const onClickHandle = (event) => {
        handleSidebar();
    }
    return (
        <div onClick={onClickHandle} >
            <Logo>
                <Img height="48" width="48" src={ImgSrc} />
                <Text>Hedgehog</Text>
            </Logo>
        </div >
    )
}
