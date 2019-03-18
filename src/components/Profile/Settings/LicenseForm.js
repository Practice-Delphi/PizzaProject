import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';
import defaultphoto from '../../../assets/default-vehicle.png';
import Photo from '../../common/Photo';
import GlobalWrap from '../../common/GlobalWrap';
import Loading from '../../Loading/Loading';
import TextError from '../../common/TextError';

import { connect } from 'react-redux';
import { uploadDocument } from "../../../actions/docaction";

class LicenseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            front: null,
            fronturl: null,
            back: null,
            backurl: null,
        }
    }

    chooseLicensePhoto(e, type) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ [`${type}url`]: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({
                [type]: file,
            });
        }
    }

    submit() {
        const { loading } = this.props.chengeddata;
        const { uploadDocument } = this.props;
        const { front, back } = this.state;
        if (!loading) {
            uploadDocument(front, back);
        }
    }

    render() {
        const { fronturl, backurl } = this.state;
        const { loading, success, error } = this.props.chengeddata;
        return (
            <form className="settingsForm" onSubmit={e => e.preventDefault()}>
                { loading && <GlobalWrap styles="gw-dark"><Loading /></GlobalWrap> }
                <h1>Change your license</h1>
                <h2>Add front image</h2>
                <Photo styles="landscape settingsPhotoPreview" url={(fronturl) ? fronturl : defaultphoto} alt="frontphoto">
                    <input type='file' accept='image/*' onChange={(e) => { this.chooseLicensePhoto(e, 'front') }} />
                </Photo>
                <h2>Add back image</h2>
                <Photo styles="landscape settingsPhotoPreview" url={(backurl) ? backurl : defaultphoto} alt="backphoto">
                    <input type='file' accept='image/*' onChange={(e) => { this.chooseLicensePhoto(e, 'back') }} />
                </Photo>
                <br></br>
                <TextError error={error}/>
                <TextError success={success}/>
                <input type="submit" onClick={this.submit.bind(this)} value="Apply" />
            </form>
        )
    }
}

LicenseForm.propTypes = {
    uploadDocument: PropTypes.func,
    docData: PropTypes.object,
    userData: PropTypes.object,
    chengeddata: PropTypes.object,
}

const mapStateToProps = state => ({
    chengeddata: state.chengeddata,
    docData: state.docData,
    userData: state.userData,
});

const mapDispatchtoProps = dispatch => ({
    uploadDocument: (front, back) => { dispatch(uploadDocument(front, back)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(LicenseForm);
