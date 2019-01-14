import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Settings.css';
import ProfileData from './ProfileData';


import { connect } from 'react-redux';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 'ProfileData',
        }
    }
    renderSettingsMain() {
        switch (this.state.show) {
            case 'ProfileData': return <ProfileData />
            case 'UploadPhoto': return <div>UploadPhoto</div>
        }
    }
    renderSettingsTypeBar() {
        return (
            <div className="settingsTypeBar">
                <div className={`settingsTypeBarButton ${(this.state.show ==='ProfileData') ? 'selected' : ''}`}
                    onClick={() => { this.setState({ show: 'ProfileData' }) }}>
                    Profile Data
                    <div className="barBorder"></div>
                </div>
                
                <div className={`settingsTypeBarButton ${(this.state.show ==='UploadPhoto') ? 'selected' : ''}`} 
                    onClick={() => { this.setState({ show: 'UploadPhoto' }) }}>
                    Upload Photo
                    <div className="barBorder"></div>
                </div>
                
            </div>
        )
    }
    render() {
        return (
            <div className="settingsContainer">
                {this.renderSettingsTypeBar()}
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