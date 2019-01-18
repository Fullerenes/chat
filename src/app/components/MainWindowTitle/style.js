import styled from 'styled-components';

const MainWindowTitleStyled = styled.div`
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: flex;
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const MainWindowTitleBoxStyled = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.7em;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
export default MainWindowTitleStyled;
export { MainWindowTitleBoxStyled };