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
    renderLink(link, name) {
        return (
            <div className="castomNavLinkDiv">
                <NavLink to={link} className="headerLink" >{name}</NavLink>
                <div className="castomHover"></div>
            </div>
        )
    }
    renderButtons() {
        const { user } = this.props.userData;
        return (
            <div className="headerRight">
                {user && this.renderLink('/profile', "Profile")}
                {user && (
                    <div className="castomNavLinkDiv">
                        <button className="headerLinkButton" onClick={this.props.logout}>Log out</button>
                        <div className="castomHover"></div>
                    </div>
                )}
                {!user && this.renderLink('/sign-in', "Sign in")}
                {!user && this.renderLink('/sign-up', "Sign up")}
            </div>
        );
    }
    renderBurger() {
        const { user } = this.props.userData;
        return (
            <ul className={`burgerContainer ${(this.state.burger) ? 'burg-open' : ''}`}>
                {user && <li className="burgerLink"><NavLink to="/profile" className="headerLink" >Profile</NavLink></li>}
                {user && <li className="burgerLink"><button className="headerLinkButtom" onClick={this.props.logout}>Log out</button></li>}
                {!user && <li className="burgerLink"><NavLink to="/sign-in" className="headerLink" >Sign in</NavLink></li>}
                {!user && <li className="burgerLink"><NavLink to="/sign-up" className="headerLink" >Sign up</NavLink></li>}
            </ul>
        );
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
                    {this.renderLink("/home", "Home")}
                    {this.renderLink("/home", "About")}
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