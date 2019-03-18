import React from 'react';
import PropTypes from 'prop-types';
import "./Photo.css";

import Photo from './Photo';

const PreviewWrap = ({ urls, defaulturl, ...props}) => {
    if (Array.isArray(urls)) {
        if (urls.length === 0 && defaulturl) return <Photo {...props} url={defaulturl} />;
        return urls.map((url, key) => {
          return <Photo key={key} {...props} url={url} />;
        });
    }
    return null;
}

PreviewWrap.propTypes = {
    urls: PropTypes.array,
    defaulturl: PropTypes.string,
}

export default PreviewWrap;