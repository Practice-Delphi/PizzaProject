import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';

import { connect } from 'react-redux';

class RestaurantForm extends Component {

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

                    <input type = "submit" onClick={this.confirmChange.bind(this)} value="Apply"/>
                </form>
            )
        }
    }
}
RestaurantForm.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchtoProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchtoProps)(RestaurantForm);
