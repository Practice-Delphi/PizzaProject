import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Vehicle.css";

import defaultphoto from '../../../assets/default-vehicle.png';

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import PhotoWrap from '../../common/PhotoWrap';

import { connect } from 'react-redux';

import { getVehicle } from '../../../actions/vehiclesaction';
import { getPhoto } from '../../../actions/photoaction';

class Vehicle extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }
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
    
    renderPictures(pictures) {
        if (Array.isArray(pictures)) {
            return pictures.map((id) => {
                return <PhotoWrap key={id} id={id} defaulturl={defaultphoto} styles="landscape" alt="vehicle-image"/>
            })
        }
        return null;
    }

    render() {
        const { veh, error, loading } = this.props.vehData;
        const { getVehicle } = this.props;
        return (
            <div className="container-global col ai-center vehicleContainer">
                { loading && <Loading /> }
                { !loading && error && <Alert message="Vehicle dont load" click={() => { getVehicle() }}/> }
                {veh && !loading && !error && (
                    <div className="vehicleInfo">
                    <h1>Your vehicle info</h1>
                    <h3><label>Number:</label> {veh.number}</h3>
                    <h3><label>Model:</label> {veh.model}</h3>
                    <h3><label>Brand:</label> {veh.brand}</h3>
                    <h3><label>Color:</label> {veh.color}</h3>
                </div>)}
                {veh && !loading && !error && (
                    <div className="vehicleImages">
                        {this.renderPictures(veh.pictures)}
                    </div>
                )}
            </div>
        );
    }
}

Vehicle.propTypes = {
    vehData: PropTypes.object,
    getVehicle: PropTypes.func,
    getPhoto: PropTypes.func,
    photosData: PropTypes.object,
}

const mapStateToProps = state => ({
    vehData: state.vehData,
    photosData: state.photosData,
});

const mapDispatchToProps = dispatch => ({
    getVehicle: () => { dispatch(getVehicle()) },
    getPhoto: (id) => { dispatch(getPhoto(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Vehicle);