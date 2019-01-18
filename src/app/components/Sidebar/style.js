import styled from 'styled-components';
import { colors } from '../../styles'
const SidebarStyled = styled.div`
  height: 100%;
  top: 48px;
  z-index: 20;
  width: 0;
  transition: width .3s, padding .3s;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: ${colors.color1};
  flex: 1 0 auto;
  white-space: nowrap;
  &.opened{
    width: 20%;
    max-width: 300px;
    padding: 0 12px;
    @media (max-width: 500px) {
      max-width: 100%;
      width: 100%;
    }
  }
`;
export default SidebarStyled;