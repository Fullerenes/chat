import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles'
const LinkStyled = styled(Link)`
    color: ${colors.links};
    margin-right: 10px;
`

export default LinkStyled