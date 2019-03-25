import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import '../Sign_In/Sign_in.css';
import './Sign_up.css';
import Header from '../Header/Header';
import TextError from '../common/TextError';

import ValidationModel from '../../validation';

import { connect } from 'react-redux';
import { registerUser } from "../../actions/authaction";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            firstName: null,
            lastName: null,
            password: null,
            confirmPassword: null,
            model: new ValidationModel(),
            errors: {},
        }
    }

    componentDidMount() {
        this.state.model.setModel({
            email: {
                name: 'Email',
                type: 'email',
            },
            password: {
                name: 'Password',
                type: 'password'
            },
            confirmPassword: {
                name: 'ConfirmPassword',
                type: 'confirmPassword',
                password: 'password',
                required: false,
            },
            firstName: {
                name: 'First Name'
            },
            lastName: {
                name: 'Last Name'
            },
        })
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
            const { registerData, registerUser, type } = this.props;
            if (!registerData.loading) {
                registerUser(type, data);
            }
        }
    }

    render() {
        // UI validation errors
        const { errors } = this.state;
        // Server Side validation error from redux\
        const { error } = this.props.registerData;
        return (
            <div className="signInConteiner">
                <div className="SignInHeader">
                    <Header></Header>
                </div>
                <div className="headerPlaseFiller"></div>
                <div className="SignInLabel">
                    <h1>SIGN UP {this.props.type.toUpperCase()}</h1>
                </div>
                <div className="SignInForm">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <label className="signupFieldLabel">First Name</label>
                        <TextError error={errors.firstName}/>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your first name"
                            onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Last Name</label>
                        <TextError error={errors.lastName}/>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your last name"
                            onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Email</label>
                        <TextError error={errors.email}/>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your Email"
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Password</label>
                        <TextError error={errors.password}/>
                        <input
                            className="signInInput"
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <label className="signupFieldLabel">Confirm Password</label>
                        <TextError error={errors.confirmPassword}/>
                        <input
                            className="signInInput"
                            type="password" placeholder="Confirm your password"
                            onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                        <TextError error={error}/>
                        <input className="signInInputSubmit" type="submit" value="Submit" onClick={this.submit.bind(this)} />
                        <label className="signInLink">Have account <NavLink to={`/sign-in`}>sign in</NavLink> now.</label>
                    </form>
                </div>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    userData: PropTypes.object,
    registerData: PropTypes.object,
    type: PropTypes.string.isRequired,
    history: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
    registerData: state.registerData,
    history: state.historyData.history,
});

const mapDispatchToProps = dispatch => ({
    registerUser: (role, data) => { dispatch(registerUser(role, data)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);