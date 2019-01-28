import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Settings.css';
import ProfileData from './ProfileData';
import RestaurantForm from './RestaurantForm';
import VehicleForm from './VehicleForm';
import LicenseForm from './LicenseForm';

import { connect } from 'react-redux';
import UploadPhoto from './UploadPhoto';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 'ProfileData',
        }
    }

    renderAddRestaurantButton() {
        const { user } = this.props.userData;
        if (user && user.role === 'seller') {
            return (
                <div className={`settingsTypeBarButton ${(this.state.show === 'AddRestaurant') ? 'selected' : ''}`}
                    onClick={() => { this.setState({ show: 'AddRestaurant' }) }}>
                        AddRestaurant
                    <div className="barBorder"></div>
                </div>
            )
        }
        return null;
    }

    renderDriverButton(name, type) {
        const { user } = this.props.userData;
        if (user && user.role === 'driver') {
            return (
                <div className={`settingsTypeBarButton ${(this.state.show === type) ? 'selected' : ''}`}
                    onClick={() => { this.setState({ show: type }) }}>
                        {name}
                    <div className="barBorder"></div>
                </div>
            )
        }
        return null;
    }

    renderSettingsMain() {
        switch (this.state.show) {
            case 'ProfileData': return <ProfileData />;
            case 'AddRestaurant': return  <RestaurantForm />;
            case 'ChangeVehicle': return <VehicleForm />;
            case 'UploadPhoto' : return <UploadPhoto />;
            case 'ChangeLicense': return <LicenseForm />;
            default: return null;
        }
    }
    
    renderSettingsTypeBar() {
        return (
            <div className="settingsTypeBar">
                <div className={`settingsTypeBarButton ${(this.state.show === 'ProfileData') ? 'selected' : ''}`}
                    onClick={() => { this.setState({ show: 'ProfileData' }) }}>
                    Profile Data
                    <div className="barBorder"></div>
                </div>

                <div className={`settingsTypeBarButton ${(this.state.show === 'UploadPhoto') ? 'selected' : ''}`}
                    onClick={() => { this.setState({ show: 'UploadPhoto' }) }}>
                    Upload Photo
                    <div className="barBorder"></div>
                </div>
                {this.renderAddRestaurantButton()}
                {this.renderDriverButton('ChangeVehicle', 'ChangeVehicle')}
                {this.renderDriverButton('ChangeLicense', 'ChangeLicense')}
            </div>
        )
    }
    render() {
        return (
            <div className=" settingsContainer">
                <div className="settingsTypeBar">
                    {this.renderSettingsTypeBar()}
                </div>
                <div className="settingsMain">
                    {this.renderSettingsMain()}
                </div>
            </div>
        )
    }
}

Settings.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

export default connect(mapStateToProps)(Settings);