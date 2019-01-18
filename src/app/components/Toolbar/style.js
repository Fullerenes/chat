import styled from 'styled-components'
import { colors } from '../../styles'
const Toolbar = styled.div`
    background: ${colors.color1};
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
`;
export default Toolbar