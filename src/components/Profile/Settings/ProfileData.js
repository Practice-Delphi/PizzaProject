import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextError from '../../common/TextError';
import ValidationModel from '../../../validation';
import GlobalWrap from '../../common/GlobalWrap';
import Loading from '../../Loading/Loading';
import './Settings.css';

import { connect } from 'react-redux';
import { chengeUserData } from '../../../actions/chengeaction';


class ProfileData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            phoneNumber: null,
            privateKey: null,
            newPassword: null,
            confirmPassword: null,
            currentPassword: null,
            model: new ValidationModel(),
            errors: {},
        }
    }

    componentDidMount() {
        this.state.model.setModel({
            privateKey: {
                name: 'Private Key',
                type: 'privateKey',
                required: false,
            },
            currentPassword: {
                name: 'Password',
                type: 'password',
                required: false,
            },
            newPassword: {
                name: 'New password',
                type: 'password',
                required: false,
            },
            confirmPassword: {
                name: 'Confirm Password',
                type: 'confirmPassword',
                password: 'newPassword',
                required: false,
            },
            firstName: {
                name: 'First Name',
                required: false,
            },
            lastName: {
                name: 'Last Name',
                required: false,
            },
        }) 
    }

    confirmChange() {
        const { model, errors, ...data } = this.state;
        model.validate(data);
        if (model.isError()) {
            this.setState({ errors: model.getErrors() });
        } else {
            this.setState({ errors: {} });
            const { chengeUserData, chengeddata} = this.props;
            if (!chengeddata.loading) {
                chengeUserData(data);
            }
        }
        // if (this.state.firstName) {
        //     this.props.chengeUserData({
        //         firstName: this.state.firstName,
        //     })
        // }
        // if (this.state.lastName) {
        //     this.props.chengeUserData({
        //         lastName: this.state.lastName,
        //     })
        // }
        // if (this.state.phoneNumber) {
        //     this.props.chengeUserData({
        //         phoneNumber: this.state.phoneNumber,
        //     })
        // }
    }

    render() {
        const { errors } = this.state;
        const { loading, error, success} = this.props.chengeddata;

        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onClick={e => e.preventDefault()}>
                    { loading && <GlobalWrap styles="gw-dark"><Loading /></GlobalWrap> }
                    <h1>Change your profile</h1>
                    <h2>Name</h2>
                    <TextError error={errors.firstName}/>
                    <input type="text" placeholder="First Name" onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                    <TextError error={errors.lastName}/>
                    <input type="text" placeholder="Last Name" onChange={(e) => { this.setState({ lastName: e.target.value }) }} />
                    <h2>Phone Number</h2>
                    <TextError error={errors.phoneNumber}/>
                    <input type="text" placeholder="Phone Number" onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />
                    <h2>Your Private Key</h2>
                    <TextError error={errors.privateKey}/>
                    <input type="text" placeholder="Private Key" onChange={(e) => { this.setState({ privateKey: e.target.value }) }} />

                    <h2>Password</h2>
                    <h3>Current Password</h3>
                    <TextError error={errors.currentPassword}/>
                    <input type="password" placeholder="Current Password" onChange={(e) => { this.setState({ currentPassword: e.target.value }) }} />

                    <h3>New Password</h3>
                    <TextError error={errors.newPassword}/>
                    <input type="password" placeholder="Password" onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                    <TextError error={errors.confirmPassword}/>
                    <input type="password" placeholder="Confirm Password" onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }} />
                    <br></br>
                    <TextError error={error}/>
                    <TextError success={success}/>
                    <input type = "submit" onClick={this.confirmChange.bind(this)} value="Apply"/>
                </form>
            )
        }
    }
}
ProfileData.propTypes = {
    userData: PropTypes.object,
}

const mapStateToProps = state => ({
    userData: state.userData,
    chengeddata: state.chengeddata,
});

const mapDispatchtoProps = dispatch => ({
    chengeUserData: (data) => { dispatch(chengeUserData(data)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileData);
