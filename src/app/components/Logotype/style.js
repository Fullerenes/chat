import styled, { keyframes } from 'styled-components'
import { Link as link } from 'react-router-dom'
import { colors } from '../../styles'
const Rotate = keyframes`
    0% { 
        filter: blur(5px);
        
    } 
    100%{
        filter: none;
        transform:rotate(3600deg);
    }
`
const Link = styled(link)`
    text-decoration: none;
    cursor: pointer;
`
const Img = styled.img`
    margin-right: 0px;
`
const Text = styled.span`
    font-family: 'Norwester';
    text-decoration: none;
    color: ${colors.links};
    font-size: 24px;
    width: 0px;
    overflow: hidden;
    transition: width .6s;
`
const Logo = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    @media (min-width: 500px) {
        &:hover ${Img}{
            animation: ${Rotate} 0.6s ease-out;
        }
        &:hover ${Text}{
            width: 100%;
        }
    }
`;

export default Logo;
export { Img, Text, Link }