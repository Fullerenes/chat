import React, { Component } from 'react'
import { LoaderBox, SkCubeBox, SkCube, SkCube2, SkCube3, SkCube4 } from './style'
export default class Loader extends Component {
    render() {
        return (
            <LoaderBox>
                <SkCubeBox>
                    <SkCube />
                    <SkCube2 />
                    <SkCube3 />
                    <SkCube4 />
                </SkCubeBox>
            </LoaderBox>
        )
    }
}
