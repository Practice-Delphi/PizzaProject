import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';

import { connect } from 'react-redux';
import { uploadVehicle } from "../../../actions/vehiclesaction";

class VehicleForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: null,
            model: null,
            brand: null,
            color: null,
        }
    }

    submit() {
        const { loading } = this.props.vehData;
        const { uploadVehicle } = this.props;
        if (!loading) {
            uploadVehicle(this.state);
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onClick={e => e.preventDefault()}>
                    <h1>Change your vehicle</h1>
                    <h2>Number</h2>
                    <input type="text" placeholder="Number" onChange={(e) => { this.setState({ number: e.target.value }) }} />

                    <h2>Model</h2>
                    <input type="text" placeholder="Model" onChange={(e) => { this.setState({ model: e.target.value }) }} />

                    <h2>Brand</h2>
                    <input type="text" placeholder="Brand" onChange={(e) => { this.setState({ brand: e.target.value }) }} />

                    <h2>Color</h2>
                    <input type="text" placeholder="Color" onChange={(e) => { this.setState({ color: e.target.value }) }} />

                    <br></br>
                    <input type="submit" onClick={this.submit.bind(this)} value="Apply" />
                </form>
            )
        }
    }
}

VehicleForm.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    vehData: PropTypes.object,
    uploadVehicle: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    vehData: state.vehData,
});

const mapDispatchtoProps = dispatch => ({
    uploadVehicle: (data, file) => { dispatch(uploadVehicle(data, file)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(VehicleForm);
