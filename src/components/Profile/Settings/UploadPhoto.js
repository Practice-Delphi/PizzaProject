import React, { Component } from 'react';
import PropTypes from 'prop-types'

import defaultphoto from '../../../assets/default-user.png';
import TextError from '../../common/TextError';
import Photo from "../../common/Photo";
import GlobalWrap from "../../common/GlobalWrap";
import Loading from "../../Loading/Loading";
import { connect } from 'react-redux';
import { uploadProfilePhoto } from '../../../actions/photoaction';

class UploadPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newphoto: null,
            newphotourl: null
        }
    }

    pickNewPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ newphotourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({
                newphoto: file,
                fileName: file.name,
            });
        }
    }
    uploadNewPhoto() {
        this.props.uploadProfilePhoto(this.state.newphoto);
    }
    render() {
        const { loading, error, success } = this.props.chengeddata;
        const { newphotourl } = this.state;
        return (
            <form className="settingsForm" onSubmit={(e) => { e.preventDefault() }}>
                { loading && <GlobalWrap styles="gw-dark"><Loading /></GlobalWrap> }
                <Photo styles="profile round settingsPhotoPreview" url={(newphotourl) ? newphotourl : defaultphoto} alt="preview">
                    <input type="file" accept='image/*' onChange={(e) => { this.pickNewPhoto(e) }} />
                </Photo>
                <TextError error={error}/>
                <TextError success={success}/>
                <input type="submit" onClick={this.uploadNewPhoto.bind(this)} value="Submit" />
            </form>
        )
    }
}

UploadPhoto.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    chengeddata: state.chengeddata,
});
const mapDispatchtoProps = dispatch => ({
    uploadProfilePhoto: (file) => { dispatch(uploadProfilePhoto(file)) },
})
export default connect(mapStateToProps, mapDispatchtoProps)(UploadPhoto);