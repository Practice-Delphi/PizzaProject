import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import defaultUserPhoto from '../../../assets/default-user.png' 
import style from "./Userinfo.css"


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
                    <h3>{this.props.userData.user.role}</h3>
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