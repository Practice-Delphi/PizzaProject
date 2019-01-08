import React, { Component } from 'react';
import './Header.css'
import { NavLink, Link } from 'react-router-dom';


class Header extends Component {

    render() {
        return (
            <div className="header">
                <div className="headerLeft">
                    <NavLink to="/home" className="headerLink">Home</NavLink>
                    <NavLink to="/home" className="headerLink">About</NavLink>
                </div>
                <div className="headerRight">
                    <NavLink to="/sign-in" className="headerLink" >Sign in</NavLink>
                    <NavLink to="/sign-up" className="headerLink" >Sign up</NavLink>
                </div>
            </div>
        )
    }
}

export default (Header);