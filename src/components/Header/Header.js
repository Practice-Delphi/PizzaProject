import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions/authaction';

class Header extends Component {
    renderButtons() {
        const { user } = this.props.userData;
        if (user) {
            return (
                <div className="headerRight">
                    <div className="castomNavLinkDiv"><NavLink to="/profile" className="headerLink" >Profile</NavLink><div className="castomHover"></div></div>
                    <div className="castomNavLinkDiv"><button className="headerLinkButtom" onClick={this.props.logout}>Log out</button><div className="castomHover"></div></div>
                </div>
            );
        } else {
            return (
                <div className="headerRight">
                    <div className="castomNavLinkDiv"><NavLink to="/sign-in" className="headerLink" >Sign in</NavLink><div className="castomHover"></div></div>
                    <div className="castomNavLinkDiv"><NavLink to="/sign-up" className="headerLink" >Sign up</NavLink><div className="castomHover"></div></div>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="header">
                <div className="headerLeft">
                    <div className="castomNavLinkDiv"><NavLink to="/home" className="headerLink">Home</NavLink> <div className="castomHover"></div></div>
                    <div className="castomNavLinkDiv"><NavLink to="/home" className="headerLink">About</NavLink><div className="castomHover"></div></div>
                </div>
                {this.renderButtons()}
            </div>
        )
    }
}

Header.propTypes = {
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(logout()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);