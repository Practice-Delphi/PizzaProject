import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./License.css";

import defaultphoto from '../../../assets/default-vehicle.png';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';

import { getDocument } from '../../../actions/docaction';
import { getPhoto } from '../../../actions/photoaction';

class License extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { doc, loading } = this.props.docData;
        const { getDocument } = this.props;
        if (!doc && !loading) {
            getDocument();
        }
    }

    componentDidUpdate() {
        const { docData, photosData, getPhoto } = this.props;
        if (docData.doc) {
            const { frontImage, backImage } = docData.doc;
            if (frontImage && !photosData[frontImage]) {
                getPhoto(frontImage);
            }
            if (backImage && !photosData[backImage]) {
                getPhoto(backImage);
            }
        }
    }

    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='photo' />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert message='Photo don`t load' click={() => { getPhoto(id) }} />
            }
            return <img src={defaultphoto} alt='photo' />;
        }
        return <img src={defaultphoto} alt='photo' />;
    }

    render() {
        const { doc, error, loading } = this.props.docData;
        const { getDocument } = this.props;
        if (doc) {
            return (
                <div className='licenseContainer'>
                    <h1>Your License</h1>
                    <div className="licenseImages">
                        <div className='licenseImage'>
                            {this.renderPhoto(doc.frontImage)}
                        </div>
                        <div className='licenseImage'>
                            {this.renderPhoto(doc.backImage)}
                        </div>
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div className='licenseContainer'>
                    <Alert message="License dont load" click={() => { getDocument() }} />
                </div>
            )
        }
        if (loading) {
            return (
                <div className='licenseContainer'>
                    <Loading />
                </div>
            )
        }
        return null;
    }
}

License.propTypes = {
    userData: PropTypes.object,
    docData: PropTypes.object,
    getDocument: PropTypes.func,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
    docData: state.docData,
    photosData: state.photosData,
});

const mapDispatchToProps = dispatch => ({
    getDocument: () => { dispatch(getDocument()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(License);