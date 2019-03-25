import React from 'react';
import PropTypes from 'prop-types';
import "./GlobalWrap.css";

const GlobalWrap = ({ children, styles, close }) => {
    return (
        <div className={`container col ai-stretch jc-stretch globalWrapContainer ${(styles) ? styles : ''}`}>
            <div className="globalWrapContent">
                { close && <CloseBtn click={close}/>}
                {children}
            </div>
        </div>
    )
}

const CloseBtn = ({ click }) => {
    return (
        <div className="gw-close" onClick={click}>
            <span></span>
            <span></span>
        </div>
    )
}

GlobalWrap.propTypes = {
   styles: PropTypes.string,
   close: PropTypes.func,
}

export default GlobalWrap;