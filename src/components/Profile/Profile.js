import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';

import Header from '../Header/Header';
import UserInfo from './UserInfo/UserInfo'
import Settings from './Settings/Settings'

import { connect } from 'react-redux';
import { getUser } from '../../actions/authaction';

class Profile extends Component {

    constructor(props){
        super(props);
        this.state ={
            show : 'UserInfo',
        } 
    } 
    
    componentDidMount() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            // this.props.history.replace('/sign-in');
            this.props.getUser();
        }
    }

    componentDidUpdate() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
    }
    renderProfile(){
        return  (
            <div>
                <div className = "ProfToolBar">
                    {this.renderToolbar()}
                </div>
                <div>
                    {this.renderMain()}
                </div>
            </div>
        )
    }
    renderToolbar() {
        return (
            <div >
                <div className="castomNavLinkDiv2line" onClick = {() =>{ this.setState({show : 'UserInfo'})}}>User Info<div className="castomHover2line"></div></div>
                <div className="castomNavLinkDiv2line" onClick = {() =>{ this.setState({show : 'Settings'})}}>Settings<div className="castomHover2line"></div></div>
            </div>
        )
    }
    renderMain(){
        switch (this.state.show) {
            case 'UserInfo' : return <UserInfo />;
            case 'Settings' : return <Settings />;
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <Header></Header>
                    {this.renderProfile()}
                   
                </div>
            );
        }
        return null;
    }
}

Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    getUser: () => { dispatch(getUser()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);