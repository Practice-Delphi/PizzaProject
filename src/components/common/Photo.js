import React from 'react';
import PropTypes from 'prop-types';
import "./Photo.css";

import Loading from '../Loading/Loading';
import Alert from '../Alert/Alert';

const Photo = ({ id, url, loading, error, errorhandler, styles, alt, onclick, children }) => {
    return (
        <div key={(id) ? id : null} className={`Photo ${(styles) ? styles : ''}`} onClick={onclick}>
            { loading && <Loading /> }
            { error && <Alert message="" click={errorhandler} />}
            { !loading && url && <img src={url} alt={(alt ? alt : "simplephoto")} /> }
            {children}
        </div>
    )
}

Photo.propTypes = {
    id: PropTypes.string,
    url: PropTypes.string,
    error: PropTypes.string,
    alt: PropTypes.string,
    errorhandler: PropTypes.func,
    onclick: PropTypes.func,
}

export default Photo;