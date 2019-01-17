import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Vehicle.css";

import { connect } from 'react-redux';

class Vehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
               Vehicle
            </div>
        );
    }
}

Vehicle.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

export default connect(mapStateToProps)(Vehicle);