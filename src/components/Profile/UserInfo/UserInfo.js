import React, { Component } from 'react';
import PropTypes from 'prop-types'

import defaultUserPhoto from '../../../assets/default-user.png'
import "./Userinfo.css"
import phoneIco from "../../../assets/Phone.png"
import mailIco from "../../../assets/simpline.png"
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';
import { getPhoto } from '../../../actions/photoaction'
import { getUser } from '../../../actions/authaction';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderPhoto() {
        const { photosData, userData, getPhoto } = this.props;
        const { user } = userData;
        if (user && user.profileImageId && photosData[user.profileImageId]) {
            const { loading, url, error } = photosData[user.profileImageId];
            if (url) {
                return <img src={url} alt='photo' />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert message="Photo dont load" click={() => { getPhoto(user.profileImageId) }} />;
            }
            return <img src={defaultUserPhoto} alt='photo' />;
        }
        return <img src={defaultUserPhoto} alt='photo' />;
    }

    render() {
        const { user, loading, error } = this.props.userData;
        const { getUser } = this.props;
        if (loading) {
            return <Loading />
        }
        if (error) {
            return <Alert message="Info dont load" click={() => { getUser() }} />
        }
        return (
            <div className="ProfileConteiner">
                <div className="mainProfilePage">
                    <div className="profilePhoto">
                        {this.renderPhoto()}
                    </div>
                    <h2> {user.firstName} {user.lastName}</h2>
                    <span className="Userinfospan"><h3>{this.props.userData.user.role}</h3></span>
                    <div >
                        <div className="infostring"><img className="inoIcon" src={phoneIco} /><h3>{user.phoneNumber}</h3></div>
                        <div className="infostring"><img className="inoIcon" src={mailIco} /><h3>{user.email}</h3></div>
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
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    photosData: state.photosData,
});

const mapDispathtoProps = dispatch => ({
    getPhoto: (id) => { dispatch(getPhoto(id)) },
    getUser: () => { dispatch(getUser()) }
})

export default connect(mapStateToProps, mapDispathtoProps)(UserInfo);