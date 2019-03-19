import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./License.css";

import defaultphoto from '../../../assets/default-vehicle.png';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import PhotoWrap from '../../common/PhotoWrap';

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

    render() {
        const { doc, error, loading } = this.props.docData;
        const { getDocument } = this.props;
        return (
            <div className='container-global col ai-streatch card licenseContainer'>
                <h1>Your License</h1>
                {loading && <Loading />}
                {!loading && error && <Alert message="License dont load" click={() => { getDocument() }} />}
                {doc && !loading && !error && (
                    <div className="licenseImages">
                        <PhotoWrap id={doc.frontImage} defaulturl={defaultphoto} styles="landscape" alt="license-front"/>
                        <PhotoWrap id={doc.backImage} defaulturl={defaultphoto} styles="landscape" alt="license-back"/>
                    </div>
                )}
            </div>
        );
    }
      
}

License.propTypes = {
    docData: PropTypes.object,
    getDocument: PropTypes.func,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object,
}

const mapStateToProps = state => ({
    docData: state.docData,
    photosData: state.photosData,
});

const mapDispatchToProps = dispatch => ({
    getDocument: () => { dispatch(getDocument()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(License);