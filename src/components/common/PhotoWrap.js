import React from 'react';
import PropTypes from 'prop-types';
import "./Photo.css";

import Photo from './Photo';

import { connect } from 'react-redux';
import { getPhoto } from '../../actions/photoaction';

const PhotoWrap = ({ id, defaulturl, getPhoto, photosData, ...props }) => {
    if ( id && photosData[id]) {
        const { loading, url, error } = photosData[id];
        return <Photo {...props} id={id} url={url ? url : defaulturl} loading={loading} error={error} errorhandler={() => { getPhoto(id) }}/>
    }
    return <Photo {...props} url={defaulturl} />
}

Photo.propTypes = {
    id: PropTypes.string,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object,
}

const mapStateToProps = state => ({
    photosData: state.photosData
});

const mapDispatchtoProps = dispatch => ({
    getPhoto: (id) => { getPhoto(id) },
});

export default connect(mapStateToProps, mapDispatchtoProps)(PhotoWrap);