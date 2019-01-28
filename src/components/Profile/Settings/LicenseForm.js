import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';
import defaultphoto from '../../../assets/default-vehicle.png';

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
        const { loading } = this.props.docData;
        const { uploadDocument } = this.props;
        const { front, back } = this.state;
        if (!loading) {
            uploadDocument(front, back);
        }
    }

    renderLicensePreview(type) {
        let url = null;
        switch (type) {
            case 'front': {
                url = this.state.fronturl;
                break;
            }
            case 'back': {
                url = this.state.backurl;
                break;
            }
            default: url = null;
        }
        if (!url) {
            return (
                <div className="settingsPhotoPreview">
                    <img src={defaultphoto} alt='photo' />
                </div>
            )
        }
        return (
            <div className='settingsPhotoPreview'>
                <img src={url} alt='logo' />
            </div>
        );
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onSubmit={e => e.preventDefault()}>
                    <h1>Change your license</h1>
                    
                    <h2>Add front image</h2>
                    {this.renderLicensePreview('front')}
                    <div className="settingsPhotoInput">
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseLicensePhoto(e, 'front') }} />
                        <label>Add image</label>
                    </div>

                    <h2>Add back image</h2>
                    {this.renderLicensePreview('back')}
                    <div className="settingsPhotoInput">
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseLicensePhoto(e, 'back') }} />
                        <label>Add image</label>
                    </div>
                    <br></br>
                    <input type="submit" onClick={this.submit.bind(this)} value="Apply" />
                </form>
            )
        }
    }
}

LicenseForm.propTypes = {
    uploadDocument: PropTypes.func,
    docData: PropTypes.object,
    userData:PropTypes.object,
}

const mapStateToProps = state => ({
    docData: state.docData,
    userData: state.userData,
});

const mapDispatchtoProps = dispatch => ({
    uploadDocument: (front, back) => { dispatch(uploadDocument(front, back)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(LicenseForm);
