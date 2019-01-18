import styled from 'styled-components';

const ButtonStyled = styled.button`
    display: inline-block;
    margin-bottom: 0;
    margin-left: auto;
    font-family: 'Norwester';
    margin-right: auto;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    cursor: pointer;
    max-width: 280px;
    background-image: none;
    padding: 6px 12px;
    font-size: 1.4rem;
    border-radius: 3px;
    border: 1px solid transparent;
    text-decoration: none;
    user-select: none;
    color: #E0F7FA;
    border-color: #00ACC1;
    background: linear-gradient(to bottom, #4DD0E1 0%, #26C6DA 100%);
    box-shadow: inset 0 1px #B2EBF2, 0 1px 2px rgba(0, 0, 0, 0.2);
    &:active, &:focus, &:hover{
        outline: 0;
        background-image: none;
    }
    &:focus, &:hover{
        border-color: #26C6DA;
        background: linear-gradient(to bottom, #80DEEA 0%, #4DD0E1 100%);
        box-shadow: inset 0 1px #E0F7FA, 0 2px 3px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        color: #fff;
    }
    &:focus, &:active{
        outline: thin dotted;
        outline: 5px auto #4DD0E1;
        outline-offset: -2px;
    }
    &:active{
        border-color: #0097A7;
        color: #B2EBF2;
        background: linear-gradient(to bottom, #26C6DA 0%, #00ACC1 100%);
        box-shadow: inset 0 2px 2px #0097A7;
    }
`;
export default ButtonStyled;