import React from 'react'
import { LoaderBox, SkCubeBox, SkCube, SkCube2, SkCube3, SkCube4 } from './style'

export default function index() {
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

