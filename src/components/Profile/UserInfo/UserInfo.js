import React from 'react';
import PropTypes from 'prop-types'

import defaultUserPhoto from '../../../assets/default-user.png';
import "./Userinfo.css";
import phoneIco from "../../../assets/Phone.png";
import mailIco from "../../../assets/simpline.png";
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import PhotoWrap from '../../common/PhotoWrap';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/authaction';

const UserInfo = ({ userData, getUser }) => {
    const { user, loading, error } = userData;
    const { profileImageId, role, phoneNumber, email, firstName, lastName } = user;
    return (
        <div className="container-global col ai-center ProfileContainer">
            { loading && <Loading /> }
            { error && <Alert message="Info dont load" click={() => { getUser() }} /> }
            { !error && !loading && (
                <div className="card mainProfilePage">
                    <PhotoWrap id={profileImageId} defaulturl={defaultUserPhoto} styles="profile round" alt="profile-photo"/>
                    <h2> {firstName} {lastName}</h2>
                    <span className="Userinfospan"><h3>{role}</h3></span>
                    <div>
                        <div className="infostring"><img className="inoIcon" src={phoneIco} alt="phonicon"/><h3>{(phoneNumber) ? phoneNumber : 'No phone number'}</h3></div>
                        <div className="infostring"><img className="inoIcon" src={mailIco} alt="mailicon"/><h3>{email}</h3></div>
                    </div>
                </div>
            )}
        </div>
    );
}

UserInfo.propTypes = {
    userData: PropTypes.object,
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({
    userData: state.userData,
});

const mapDispathtoProps = dispatch => ({
    getUser: () => { dispatch(getUser()) }
})

export default connect(mapStateToProps, mapDispathtoProps)(UserInfo);