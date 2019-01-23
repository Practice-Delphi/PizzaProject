import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPhoto } from '../../../actions/photoaction'
import defaultUserPhoto from '../../../assets/default-user.png'
import "./Userinfo.css"
import phoneIco from "../../../assets/Phone.png"
import mailIco from "../../../assets/simpline.png"


class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="ProfileConteiner">
                <div className="mainProfilePage">
                    <div className="profilePhoto">
                        <img className="userProfilePhoto" src={(this.props.userData.user && this.props.userData.user.profileImageId &&
                            this.props.photosData[this.props.userData.user.profileImageId]) ? this.props.photosData[this.props.userData.user.profileImageId].url : defaultUserPhoto} />
                    </div>
                    <h2> {this.props.userData.user.firstName} {this.props.userData.user.lastName}</h2>
                    <span className="Userinfospan"><h3>{this.props.userData.user.role}</h3></span>
                    <div >
                        <div className="infostring"><img className="inoIcon" src={phoneIco} /><h3>{this.props.userData.user.phoneNumber}</h3></div>
                        <div className="infostring"><img className="inoIcon" src={mailIco} /><h3>{this.props.userData.user.email}</h3></div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    }



}

UserInfo.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    photosData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    photosData: state.photosData,
});
const mapDispathtoProps = dispatch => ({
    getPhoto: (id) => { dispatch(getPhoto(id)) },
})

export default connect(mapStateToProps, mapDispathtoProps)(UserInfo);