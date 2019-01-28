import React, { Component } from 'react';
import PropTypes from 'prop-types'

import defaultphoto from '../../../assets/default-user.png';

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
    chooseNewPhoto() {
        this.props.uploadProfilePhoto(this.state.newphoto);
        console.log('chooseNewPhoto');
    }
    renderPreview() {
        const { newphotourl } = this.state;
        if (newphotourl) {
            return <img src={newphotourl} alt='preview' />;
        }
        return <img src={defaultphoto} alt='preview' />;
    }
    render() {
        return (
            <form className="settingsForm" onSubmit={(e) => { e.preventDefault() }}>
                <div className="settingProfilePhotoInput">
                    {this.renderPreview()}
                    <input type="file" accept='image/*' onChange={(e) => { this.pickNewPhoto(e) }} />
                </div>

                <input type="submit" onClick={this.chooseNewPhoto.bind(this)} value="Submit" />
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