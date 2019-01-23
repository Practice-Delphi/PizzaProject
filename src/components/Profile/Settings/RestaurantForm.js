import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';

import { connect } from 'react-redux';

class RestaurantForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: {
                latitude: 0,
                longitude: 0,
                set: (lat, lon) => {
                    this.latitude = lat;
                    this.longitude = lon;
                }
            },
            logo: null,
            logourl: null,
            images: [],
            imagesurls: []
        }
    }

    confirmChange() {
        
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onClick={e => e.preventDefault()}>
                    <h1>Create your restaurant</h1>
                    <h2>Add information</h2>

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
