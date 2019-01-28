import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Settings.css';
import defaultllogo from '../../../assets/default-logo.png';

import { connect } from 'react-redux';

class RestaurantForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: {
                latitude: 0,
                longitude: 0,
                set: (lat, lon) => {
                    this.latitude = lat;
                    this.longitude = lon;
                }
            },
            logo: null,
            logourl: null,
            images: [],
            imagesurls: []
        }
    }

    chooseLogoPhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ logourl: reader.result });
            };
            reader.readAsDataURL(file);
            this.setState({
                logo: file,
            });
        }
    }

    confirmChange() {

    }

    renderLogoPreview() {
        const { logourl } = this.state;
        if (!logourl) {
            return (
                <div className="settingsPhotoPreview">
                    <img src={defaultllogo} alt='photo' />
                </div>
            )
        }
        return (
            <div className='settingsPhotoPreview'>
                <img src={logourl} alt='logo' />
            </div>
        );
    }

    render() {
        if (this.props.userData.user) {
            return (
                <form className="settingsForm" onSubmit={e => e.preventDefault()}>
                    <h1>Create your restaurant</h1>
                    <h2>Add information</h2>
                    <h2>Name</h2>
                    <input type="text" placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    <h2>Description</h2>
                    <textarea type="text" placeholder="Description" onChange={(e) => { this.setState({ description: e.target.value }) }} />
                    <h2>Add logo</h2>
                    {this.renderLogoPreview()}
                    <div className="settingsPhotoInput">
                        <input type='file' accept='image/*' multiple onChange={(e) => { this.chooseLogoPhoto(e) }} />
                        <label>Choose logo</label>
                    </div>
                    <h2>Add Your Restaurant Location</h2>
                    Here must be a google map picker

                    <input type="submit" onClick={this.confirmChange.bind(this)} value="Apply" />
                </form>
            )
        }
    }
}
RestaurantForm.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchtoProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchtoProps)(RestaurantForm);
