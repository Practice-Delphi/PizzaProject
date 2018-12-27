import React, { Component } from 'react';
import style from './Header.css'
import {  Link } from 'react-router-dom';


class Header extends Component {

    render(){
        return (
            <div  className= "header">
                    <div className= "headerLeft">
                        <div>
                            <Link to="/home"  className = "headerLink">Home</Link>
                        </div>
                        <div>
                            <Link to="/home" className = "headerLink">About</Link>
                        </div>
                    </div>
                    <div className = "headerRight">
                        <div>
                            <Link to="/sign-in" className = "headerLink">Sign in</Link>
                        </div>
                    </div>
            </div>
        )
    }
}

export default (Header);