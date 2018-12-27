import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import style from './Sign_in_Sell.css';
import Header from '../../Header/Header'



class SignInSell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            password: null,
        }
    }

    componentDidMount() {

    }

    submit() {
        const data = {
            userName: this.state.userName.toLowerCase(),
            password: this.state.password,
        }
    }

    render(){
        return(
            <div className="signInConteiner">
                <div className="SignInHeader">
                    <Header></Header>
                </div>
                
            <div className= "headerPlaseFiller"></div>
                <div className="SignInLabel">
                    <h1>Seller authorization</h1>
                </div>
                <div className="SignInForm">


                    <form >
                            <input
                            className="signInInput"
                            type="email" placeholder="Your email adress"
                            onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                                                        
                            <input
                            className="signInInput"
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                            
                            <input className="signInInputSubmit" type="submit" value="Submit" onClick={this.submit.bind(this)} />
                    </form>
                </div>
            </div>
        
        );
    }
}

SignInSell.propTypes = {
    userData: PropTypes.object,
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignInSell);