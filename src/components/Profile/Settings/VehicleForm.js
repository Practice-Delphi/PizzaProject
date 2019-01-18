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
            vehphoto: [],
            urls: [],
        }
    }

    chooseVehPhoto(e) {
        const files = e.target.files;
        if (files) {
            [...files].forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({ urls: [...this.state.urls, reader.result] });
                };
                reader.readAsDataURL(file);
            });

            this.setState({
                vehphoto: [...this.state.vehphoto, ...files],
            });
        }
    }

    submit() {
        const { loading } = this.props.vehData;
        const { uploadVehicle } = this.props;

        const { model, brand, color, number, vehphoto } = this.state;

        if (!loading) {
            uploadVehicle({ model, number, brand, color }, vehphoto);
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onClick={e => e.preventDefault()}>
                    <h1>Change your vehicle</h1>

                    <h2>Add photos</h2>
                    <div className="settingsPhotoInput">
                        <input type='file' accept='image/*' multiple onChange={(e) => { this.chooseVehPhoto(e) }} />
                        <label>Add photos</label>
                    </div>
                    
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
