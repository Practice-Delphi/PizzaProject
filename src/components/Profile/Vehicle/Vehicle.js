import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Vehicle.css";

import { connect } from 'react-redux';

import { getVehicle } from '../../../actions/vehiclesaction';

import testimg from '../../../assets/testveh.png';
import testimg2 from '../../../assets/testimg.jpg';
import testimg3 from '../../../assets/testveh2.jpg';

class Vehicle extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { veh, loading } = this.props.vehData;
        const { getVehicle } = this.props;
        if (!veh && !loading) {
            getVehicle();
        }
    }

    componentDidUpdate() {
        const { veh, error } = this.props.vehData;
    }

    render() {
        const { veh, error, loading } = this.props.vehData;
        if (veh) {
            return (
                <div className="vehicleContainer">
                    <div className="vehicleImages">
                        <div className="vehicleInfo">
                            <h1>Your vehicle info</h1>
                            <h3><label>Number:</label> {veh.number}</h3>
                            <h3><label>Model:</label> {veh.model}</h3>
                            <h3><label>Brand:</label> {veh.brand}</h3>
                            <h3><label>Color:</label> {veh.color}</h3>
                        </div>
                        <img src={testimg} alt="image" />
                        <img src={testimg2} alt="image" />
                        <img src={testimg3} alt="image" />
                        <img src={testimg} alt="image" />
                        <img src={testimg2} alt="image" />
                        <img src={testimg3} alt="image" />
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="vehicleContainer">
                    {error}
                </div>
            )
        }
        if (loading) {
            return (
                <div className="vehicleContainer">
                    Here must be loader (I think)
                </div>
            )
        }
        return null;
    }
}

Vehicle.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    vehData: PropTypes.object,
    getVehicle: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    vehData: state.vehData,
});

const mapDispatchToProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);