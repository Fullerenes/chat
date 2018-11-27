import styled, { css } from 'styled-components';

const MessageStyled = styled.div`
  padding: 10px 20px;
  background: #E5E5EA;
  color: black;
  border-radius: 25px;
  width: auto;
  margin: 0 auto 15px 0px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 90%;
  position: relative;
  ${props => !props.my && css`
    &:before{
      content: "";
      position: absolute;
      z-index: 2;
      bottom: -2px;
      left: -7px;
      height: 19px;
      border-left: 20px solid #E5E5EA;
      border-bottom-right-radius: 16px 14px;
      transform: translate(0, -2px);
      border-bottom-right-radius: 15px 0px\9;
      transform: translate(-1px, -2px)\9;
    }
    &:after{
      content: "";
      position: absolute;
      z-index: 3;
      bottom: -2px;
      left: 4px;
      width: 26px;
      height: 20px;
      background: white;
      border-bottom-right-radius: 10px;
      transform: translate(-30px, -2px);
    }
  `}
  
  ${props => props.my && css`
    background: #00e34d;
    color: white;
    margin: 0 0 15px auto;
    align-items: right;
    &:before{
      content: "";
      position: absolute;
      z-index: 1;
      bottom: -2px;
      right: -8px;
      height: 19px;
      border-right: 20px solid #00e34d;
      border-bottom-left-radius: 16px 14px;
      transform: translate(0, -2px);
      border-bottom-left-radius: 15px 0px\9;
      transform: translate(-1px, -2px)\9;
    }
    &:after{
      content: "";
      position: absolute;
      z-index: 1;
      bottom: -2px;
      right: -42px;
      width: 12px;
      height: 20px;
      background: white;
      border-bottom-left-radius: 10px;
      transform: translate(-30px, -2px);
    }
    `
  }
`;

const MessageTimeStyled = styled.div`
  display: block;
  font-size: .7em;
  display: flex;
  align-items: center;
  ${props => props.my && css`
    text-align: right;
  `}
`;
const MessageAttributsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MessageNickNameStyled = styled.div`
  margin-right: 15px;
`;
export default MessageStyled;
export { MessageTimeStyled, MessageAttributsStyled, MessageNickNameStyled };