import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';
import defaultphoto from '../../../assets/default-vehicle.png';

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
            slide: 0,
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

    changeSlide(n) {
        const { urls } = this.state;
        if (Array.isArray(urls)) {
            let slide = this.state.slide;
            slide += n;
            if (slide > urls.length - 1) {
                slide = 0;
            } else if (slide < 0) {
                slide = (urls.length === 0) ? 0 : urls.length - 1;
            }
            this.setState({ slide, transform: 0 });
        }
    }

    renderPreview() {
        const { urls, slide } = this.state;
        if (Array.isArray(urls)) {
            if (urls.length === 0) {
                return (
                    <div className="settingsPhotoPreview">
                        <img src={defaultphoto} alt='photo' />
                    </div>
                )
            }
            return urls.map((url, key) => {
                return (
                    <div key={key} 
                    className={`settingsPhotoPreview slider ${(key === slide) ? 'block' : 'none'}`}
                    onClick={() => { this.changeSlide(1) }}>
                        <img src={url} alt='photo' />
                    </div>
                );
            });
        }
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onSubmit={e => e.preventDefault()}>
                    <h1>Change your vehicle</h1>
                    
                    <h2>Add photos</h2>
                    <div>
                        {this.renderPreview()}
                    </div>
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
