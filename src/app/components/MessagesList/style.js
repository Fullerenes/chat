import styled from 'styled-components';

const MessagesListStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  min-height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  
`;

const MessagesWindowStyled = styled.div`
  box-sizing: border-box;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;
export default MessagesListStyled;
export { MessagesWindowStyled }; 