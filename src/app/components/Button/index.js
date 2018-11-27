import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyled from './style'

function Button(props) {
    return (
        <ButtonStyled {...props} />
    )
}
Button.propTypes = {
    type: PropTypes.string
}
export default Button;

