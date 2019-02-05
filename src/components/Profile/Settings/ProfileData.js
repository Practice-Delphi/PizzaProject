import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            password: null,
            confirmpassword: null,
            currentPassword: null,

        }
    }
    confirmChange() {
        if (this.state.firstName) {
            this.props.chengeUserData({
                firstName: this.state.firstName,
            })
        }
        if (this.state.lastName) {
            this.props.chengeUserData({
                lastName: this.state.lastName,
            })
        }
        if (this.state.phoneNumber) {
            this.props.chengeUserData({
                phoneNumber: this.state.phoneNumber,
            })
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onClick={e => e.preventDefault()}>
                    <h1>Change your profile</h1>
                    <h2>Name</h2>
                    <input type="text" placeholder="First Name" onChange={(e) => { this.setState({ firstName: e.target.value }) }} />
                    <input type="text" placeholder="Last Name" onChange={(e) => { this.setState({ lastName: e.target.value }) }} />

                    <h2>Phone Number</h2>
                    <input type="text" placeholder="Phone Number" onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />

                    <h2>Password</h2>
                    <h3>Current Password</h3>
                    <input type="text" placeholder="Current Password" onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} />

                    <h3>New Password</h3>
                    <input type="text" placeholder="Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    <input type="text" placeholder="Confirm Password" onChange={(e) => { this.setState({ confirmpassword: e.target.value }) }} />
                    <br></br>
                    <input type = "submit" onClick={this.confirmChange.bind(this)} value="Apply"/>
                </form>
            )
        }
    }
}
ProfileData.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    chengeddata: state.chengeddata,
});

const mapDispatchtoProps = dispatch => ({
    chengeUserData: (data) => { dispatch(chengeUserData(data)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(ProfileData);
