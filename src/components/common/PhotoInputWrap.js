import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Photo.css";

import Photo from './Photo';

class PhotoInputWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blob: null,
            url: null,
            blobs: [],
            urls: [],
        }
    }

    choosePhoto(e) {
        const file = e.target.files[0];
        const { callback } = this.props;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ url: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({ blob: file }, () => callback(this.state.blob));
        }
    }
    choosePhotos(e) {
        const files = e.target.files;
        const { callback } = this.props;
        if (files) {
            [...files].forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({ urls: [...this.state.urls, reader.result] });
                };
                reader.readAsDataURL(file);
            });
            this.setState({ blobs: [...this.state.blobs, ...files] }, () => callback(this.state.blobs));
        }
    }
    render() {
        const { defaulturl, multiple, styles, ...props } = this.props;
        const { url, urls } = this.state;
        if (multiple) {
            return (
                <Photo {...props} styles={`photo-input ${styles}`} url={(urls) ? urls[0] : defaulturl} >
                    <input type='file' multiple accept='image/*' onChange={(e) => { this.choosePhotos(e) }} />
                </Photo>
            )
        } 
        return (
            <Photo {...props} {...props} styles={`photo-input ${styles}`} url={(url) ? url : defaulturl}>
                <input type='file' accept='image/*' onChange={(e) => { this.choosePhoto(e) }} />
            </Photo>
        )
    }
}

PhotoInputWrap.propTypes = {
    default: PropTypes.string,
    alt: PropTypes.string,
    callback: PropTypes.func
}

export default PhotoInputWrap;