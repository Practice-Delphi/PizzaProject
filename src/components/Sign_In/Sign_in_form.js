import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Sign_in.css';
import Header from '../Header/Header';

import ValidationModel from '../../validation';

import { connect } from 'react-redux';
import { loginUser } from  '../../actions/authaction';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            model: new ValidationModel(),
            errors: {}
        }
    }

    componentDidMount() {
        this.state.model.setModel({
            email: {
                name: 'Email',
                type: 'email'
            },
            password: {
                name: 'Password',
            }
        });
    }

    componentDidUpdate() {
        if (this.props.userData.user) {
            this.props.history.replace('/profile');
        }
    }

    submit() {
        const { model, errors, ...data } = this.state;
        model.validate(data);
        if (model.isError()) {
            this.setState({ errors: model.getErrors() });
        } else {
            this.setState({ errors: {} });
            this.props.login(data, this.props.type);
        }
        return false;
    }

    render() {
        // UI validations errors
        const { errors } = this.state;
        // Server Side validation error from redux
        const { error } = this.props.userData;
        return (
            <div className="signInConteiner">
                <div className="SignInHeader">
                    <Header></Header>
                </div>

                <div className="headerPlaseFiller"></div>
                <div className="SignInLabel">
                    <h1>SIGN IN {this.props.type.toUpperCase()}</h1>
                </div>
                <div className="SignInForm">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div className="signinError">{(error) ? error : ''}</div>
                        <div className="signinError">{(errors.email) ? errors.email : ''}</div>
                        <input
                            className="signInInput"
                            type="email" placeholder="Your email adress"
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            required />
                        <div className="signinError">{(errors.password) ? errors.password : ''}</div>
                        <input
                            className="signInInput"
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                            required />

                        <input className="signInInputSubmit" type="submit" value="Submit" onClick={this.submit.bind(this)} />
                        <label className="signInLink">Dont have account already <NavLink to={`/sign-up`}>create one.</NavLink></label>
                    </form>
                </div>
            </div>
        );
    }
}

SignInForm.propTypes = {
    userData: PropTypes.object,
    type: PropTypes.string.isRequired,
    login: PropTypes.func,
    history: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    login: (data, role) => { dispatch(loginUser(data, role)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);