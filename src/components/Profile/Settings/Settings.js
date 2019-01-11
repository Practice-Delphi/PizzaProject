import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import ProfileData from './ProfileData';

class Settings extends Component {

    constructor(props){
        super(props);
        this.state ={
            show : 'ProfileData',
        } 
    } 
    renderSettingsMain(){
        switch (this.state.show) {
            case 'ProfileData' : return <ProfileData /> 
            case 'UploadPhoto' : return <div>UploadPhoto</div> 
        }
    }
    renderSettingsTypeBar() {
        return (
            <div>
                <div onClick={() => {this.setState({show : 'ProfileData'})}}>
                    <h3>Profile Data</h3>
                </div>
                <div onClick={() => {this.setState({show : 'UploadPhoto'})}}>
                    <h3>Upload Photo</h3>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div className=" settingsConteiner">
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

export default connect(mapStateToProps) (Settings);