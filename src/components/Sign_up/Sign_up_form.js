import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Sign_In/Sign_in.css';
import './Sign_up.css';
import Header from '../Header/Header';

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
            phoneNumber: null,
            privateKey: null,
            password: null,
            confirmPassword: null,
            model: new ValidationModel(),
            errors: {},
        }
    }

    componentDidMount() {
        // if (this.props.userData.user) {
        //     this.props.history.replace('/profile');
        // }

        this.state.model.setModel({
            email: {
                name: 'Email',
                type: 'email',
            },
            phoneNumber: {
                name: 'Phone Number',
                type: 'phonenumber'
            },
            password: {
                name: 'Password',
                type: 'password'
            },
            firstName: {
                name: 'First Name'
            },
            lastName: {
                name: 'Last Name'
            },
            privateKey: {
                name: 'Private Key',
                type: 'key'
            },
        })
    }

    submit() {
        const { model, errors, confirmPassword, ...data } = this.state;
        // const data = {
        //     email: (this.state.email) ? this.state.email.toLowerCase() : '',
        //     firstName: this.state.firstName,
        //     lastName: this.state.lastName,
        //     phoneNumber: this.state.phoneNumber,
        //     privateKey: this.state.privateKey,
        //     password: this.state.password,
        //     confirmPassword: this.state.confirmPassword,
        // }
        model.validate(data);
        model.confirm(data.password, confirmPassword);
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
        const { errors } = this.state;
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
                        <div className="signinError">{(errors.firstName) ? errors.firstName : ''}</div>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your first name"
                            onChange={(e) => { this.setState({ firstName: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Last Name</label>
                        <div className="signinError">{(errors.lastName) ? errors.lastName : ''}</div>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your last name"
                            onChange={(e) => { this.setState({ lastName: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Email</label>
                        <div className="signinError">{(errors.email) ? errors.email : ''}</div>
                        <input
                            className="signInInput"
                            type="email" placeholder="Your Email"
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Phone Number</label>
                        <div className="signinError">{(errors.phoneNumber) ? errors.phoneNumber : ''}</div>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your Phone Number"
                            onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Private Key</label>
                        <div className="signinError">{(errors.privateKey) ? errors.privateKey : ''}</div>
                        <input
                            className="signInInput"
                            type="text" placeholder="Your Private Key"
                            onChange={(e) => { this.setState({ privateKey: e.target.value }) }}
                            required />
                        <label className="signupFieldLabel">Password</label>
                        <div className="signinError">{(errors.password) ? errors.password : ''}</div>
                        <input
                            className="signInInput"
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <label className="signupFieldLabel">Confirm Password</label>
                        <div className="signinError">{(errors.confirmPassword) ? errors.confirmPassword : ''}</div>
                        <input
                            className="signInInput"
                            type="password" placeholder="Confirm your password"
                            onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                        <input className="signInInputSubmit" type="submit" value="Submit" onClick={this.submit.bind(this)} />
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
}

const mapStateToProps = state => ({
    userData: state.userData,
    registerData: state.registerData,
});

const mapDispatchToProps = dispatch => ({
    registerUser: (role, data) => { dispatch(registerUser(role, data)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);