import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import defaultUserPhoto from '../../../assets/default-user.png' 
import style from "./Userinfo.css"
import phoneIco from "../../../assets/Phone.png"
import mailIco from "../../../assets/simpline.png"


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.state ={
            
        } 
    } 


    render(){
        return (
            <div className="ProfileConteiner">
                <div className="mainProfilePage">
                    <img className="userProfilePhoto" src={defaultUserPhoto} />
                    <h2> {this.props.userData.user.firstName} {this.props.userData.user.lastName}</h2>
                    <span className="Userinfospan"><h3>{this.props.userData.user.role}</h3></span>
                    <div >
                        <div className="infostring"><img className="inoIcon" src={phoneIco}/><h3>{this.props.userData.user.phoneNumber}</h3></div>
                        <div className="infostring"><img className="inoIcon" src={mailIco}/><h3>{this.props.userData.user.email}</h3></div>
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
        
    }

    const mapStateToProps = state => ({
        history: state.historyData.history,
        userData: state.userData,
    });

export default connect(mapStateToProps)   (UserInfo);