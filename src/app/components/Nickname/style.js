import styled from 'styled-components';

const NicknameStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const FormStyled = styled.form`
    display: flex;
    flex-direction: row;
`
const NicknameLabelStyled = styled.span`
    display: inline-block;
    resize: none;
    height: 34px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1.42857143;
    color: black;
    border: 1px solid transparent;
    border-radius: 4px;
    box-sizing: border-box;
`;
export default NicknameStyled;
export { NicknameLabelStyled, FormStyled };