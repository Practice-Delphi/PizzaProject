import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Vehicle.css";

import defaultphoto from '../../../assets/default-vehicle.png';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';

import { getVehicle } from '../../../actions/vehiclesaction';
import { getPhoto } from '../../../actions/photoaction';

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
        const { vehData, photosData, getPhoto } = this.props;
        if (vehData.veh && Array.isArray(vehData.veh.pictures)) {
            vehData.veh.pictures.forEach(picture => {
                if (!photosData[picture]) {
                    getPhoto(picture);
                }
            });
        }
    }

    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='photo' />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert message='Photo don`t load' click={() => { getPhoto(id) }} />
            }
            return <img src={defaultphoto} alt='photo' />;
        }
        return <img src={defaultphoto} alt='photo' />;
    }

    renderPictures(pictures) {
        return pictures.map((id, key) => {
            return <div key={id} className={`vehicleImage`}>
                {this.renderPhoto(id)}
            </div>
        })
    }

    render() {
        const { veh, error, loading } = this.props.vehData;
        const { getVehicle } = this.props;
        if (veh) {
            const { pictures } = veh;
            return (
                <div className="vehicleContainer">
                    <div className="vehicleInfo">
                        <h1>Your vehicle info</h1>
                        <h3><label>Number:</label> {veh.number}</h3>
                        <h3><label>Model:</label> {veh.model}</h3>
                        <h3><label>Brand:</label> {veh.brand}</h3>
                        <h3><label>Color:</label> {veh.color}</h3>
                    </div>
                    <div className="vehicleImages">
                        {this.renderPictures(pictures)}
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="vehicleContainer">
                    <Alert message="Vehicle dont load" click={() => { getVehicle() }}/>
                </div>
            )
        }
        if (loading) {
            return (
                <div className="vehicleContainer">
                    <Loading />
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
    getPhoto: PropTypes.func,
    photosData: PropTypes.object,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    vehData: state.vehData,
    photosData: state.photosData,
});

const mapDispatchToProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);