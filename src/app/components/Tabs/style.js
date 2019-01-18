import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Tabs = styled.ul`
    list-style: none;
    width: 100%;
    padding: 0 20px;
    line-height: 34px;
    height: 36px;
    overflow: hidden;
    font-size: 16px;
    position: relative;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    &:before{
        position: absolute;
        content: " ";
        width: 100%;
        bottom: 0;
        left: 0;
        border-bottom: 1px solid #AAA;
        z-index: 1;
    }
`;
const Close = styled(Link)`
    display: none;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: -6px;
    width: 12px;
    height: 12px;
    opacity: 0.3;
    &:hover{
        opacity: 1;
    }
    &:before, &:after{
        position: absolute;
        left: 5px;
        content: ' ';
        height: 13px;
        width: 2px;
        background-color: #333;
    }
    &:before{
        transform: rotate(45deg);
    }
    &:after{
        transform: rotate(-45deg);
    }
`
const Tab = styled.li`
    border: 1px solid #AAA;
    background: #D1D1D1;
    background: linear-gradient(top, #ECECEC 50%, #D1D1D1 100%);
    display: inline-block;
    position: relative;
    flex: 1;
    z-index: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #FFF;
    text-shadow: 0 1px #FFF;
    margin: 0 -5px;
    padding: 0 20px;
    max-width: 150px;
    &:before, &:after{
        border: 1px solid #AAA;
        position: absolute;
        bottom: -1px;
        width: 5px;
        height: 5px;
        content: " ";
    }
    &:before{
        left: -6px;
        border-bottom-right-radius: 6px;
        border-width: 0 1px 1px 0;
        box-shadow: 2px 2px 0 #D1D1D1;
    }
    &:after{
        right: -6px;
        border-bottom-left-radius: 6px;
        border-width: 0 0 1px 1px;
        box-shadow: -2px 2px 0 #D1D1D1;
    }
    &.selected{
        background: #FFF;
        color: #333;
        z-index: 2;
        border-bottom-color: #FFF;
        &:before{
            box-shadow: 2px 2px 0 #FFF;
        }
        &:after{
            box-shadow: -2px 2px 0 #FFF;
        }
    }
    a   {
        &:not(:last-child){
            display: block;
            text-align: center;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    &.selected:hover ${Close}{
        display:block
    }
`;
export { Tabs, Tab, Close };