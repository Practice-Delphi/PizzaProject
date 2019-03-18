import React from 'react';
import PropTypes from 'prop-types';
import "./TextError.css";

const TextError = ({ error, styles, success}) => {
    return (
        <div className={`TextError ${success ? 'te-success' : ''} ${(styles) ? styles: ''}`}>
            {(error) ? error: ''}
            {(success) ? success: ''}
        </div>
    )
}

TextError.propTypes = {
    styles: PropTypes.string,
    error: PropTypes.string,
}

export default TextError;