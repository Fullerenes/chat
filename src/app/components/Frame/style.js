import styled from 'styled-components';
import Norwester from './norwester.otf'

const FrameStyled = styled.div`
  @font-face {
    font-family: 'Norwester';
    src: url(${Norwester});
  }
  height: 100%;
  position: relative;
  box-sizing: border-box;
  font-size: 16px;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;
const FrameContent = styled.div`
  display:flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  flex: 1;
`
export default FrameStyled;
export { FrameContent };