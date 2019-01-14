import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import menuImg from '../../assets/menu.svg';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions/authaction';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            burger: false,
        }
    }
    renderButtons() {
        const { user } = this.props.userData;
        if (user) {
            return (
                <div className="headerRight">
                    <div className="castomNavLinkDiv">
                        <NavLink to="/profile" className="headerLink" >Profile</NavLink>
                        <div className="castomHover"></div>
                    </div>
                    <div className="castomNavLinkDiv">
                        <button className="headerLinkButtom" onClick={this.props.logout}>Log out</button>
                        <div className="castomHover"></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="headerRight">
                    <div className="castomNavLinkDiv">
                        <NavLink to="/sign-in" className="headerLink" >Sign in</NavLink>
                        <div className="castomHover"></div>
                    </div>
                    <div className="castomNavLinkDiv">
                        <NavLink to="/sign-up" className="headerLink" >Sign up</NavLink>
                        <div className="castomHover"></div>
                    </div>
                </div>
            );
        }
    }
    renderLogOut() {
    }
    renderBurger() {
        const { user } = this.props.userData; 
        if (user) {
            return (
                <ul className={`burgerContainer ${(this.state.burger) ? 'open' : ''}`}>
                    <li className="burgerLink"><NavLink to="/profile" className="headerLink" >Profile</NavLink></li>
                    <li className="burgerLink"><button className="headerLinkButtom" onClick={this.props.logout}>Log out</button></li>
                </ul>
            );
        } else {
            return (
                <ul className={`burgerContainer ${(this.state.burger) ? 'open' : ''}`}>
                    <li className="burgerLink"><NavLink to="/sign-in" className="headerLink" >Sign in</NavLink></li>
                    <li className="burgerLink"><NavLink to="/sign-up" className="headerLink" >Sign up</NavLink></li>
                </ul>
            );
        }
    }
    renderBurgerButton() {
        return (
            <div className="burgerButton" onClick={() => {this.setState({ burger: (this.state.burger) ? false : true })}}>
                <img src={menuImg} alt='menu' />
            </div>
        )
    }
    render() {
        return (
            <div className="header">
                <div className="headerLeft">
                    <div className="castomNavLinkDiv"><NavLink to="/home" className="headerLink">Home</NavLink> <div className="castomHover"></div></div>
                    <div className="castomNavLinkDiv"><NavLink to="/home" className="headerLink">About</NavLink><div className="castomHover"></div></div>
                </div>
                {this.renderButtons()}
                {this.renderBurgerButton()}
                {this.renderBurger()}
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