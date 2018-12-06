import styled, { keyframes } from 'styled-components';

const LoaderBox = styled.div`
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 60px;
    right: 0;
    margin: auto;
    user-select: none;
`;
const SkCubeAnim = keyframes`
    0%, 10% {
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0; 
    } 25%, 75% {
        transform: perspective(140px) rotateX(0deg);
        opacity: 1; 
    } 90%, 100% {
        transform: perspective(140px) rotateY(180deg);
        opacity: 0; 
    }
`;
const SkCubeBox = styled.div`
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    transform: rotateZ(45deg);
`;
const SkCube = styled.div`
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1); 
    &:before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #333;
        animation: ${SkCubeAnim} 2.4s infinite linear both;
        transform-origin: 100% 100%;
    }
`
const SkCube2 = styled(SkCube)`
    transform: scale(1.1) rotateZ(90deg);
    &:before{
        animation-delay: 0.3s;
    }
`;
const SkCube3 = styled(SkCube)`
    transform: scale(1.1) rotateZ(180deg);
    &:before{
        animation-delay: 0.6s;
    }
`;
const SkCube4 = styled(SkCube)`
    transform: scale(1.1) rotateZ(270deg);
    &:before{
        animation-delay: 0.9s;
    }
`;
export {
    LoaderBox, SkCubeBox, SkCube, SkCube2, SkCube3, SkCube4
};
