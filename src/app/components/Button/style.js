import styled from 'styled-components';

const ButtonStyled = styled.button`
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
    &:focus{
        color: #fff;
        background-color: #286090;
        border-color: #122b40;
    }
    &:hover{
        color: #fff;
        background-color: #286090;
        border-color: #204d74;
    }
    &:active{
        color: #fff;
        background-color: #204d74;
        border-color: #122b40;
    }
`;
export default ButtonStyled;