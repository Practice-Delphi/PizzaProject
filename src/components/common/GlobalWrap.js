import React from 'react';
import PropTypes from 'prop-types';
import "./GlobalWrap.css";

const GlobalWrap = ({ children, styles }) => {
    return (
        <div className={`container col ai-stretch jc-stretch globalWrapContainer ${(styles) ? styles : ''}`}>
            <div className="globalWrapContent">
                {children}
            </div>
        </div>
    )
}

GlobalWrap.propTypes = {
   styles: PropTypes.string,
}

export default GlobalWrap;