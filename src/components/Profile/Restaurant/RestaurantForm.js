import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Restaurant.css';
import GoogleMap from '../../GoogleMap/GoogleMap';
import defaultllogo from '../../../assets/default-logo.png';

import { connect } from 'react-redux';
import { createRestaurant, deleteRestaurant } from '../../../actions/restaurantaction';

class RestaurantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            logo: null,
            logourl: null,
            photos: [],
            photosurls: [],
            location: null,
            label: null,
            show: false,
        }
    }

    componentDidUpdate() {
    }

    choosePhotos(e) {
        const files = e.target.files;
        if (files) {
            [...files].forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.setState({ photosurls: [...this.state.photosurls, reader.result] });
                };
                reader.readAsDataURL(file);
            });

            this.setState({
                photos: [...this.state.photos, ...files],
            });
        }
    }

    chooseLogo(e) {
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

    submit() {
        const { createRestaurant } = this.props;
        const { loading } = this.props.restaurantStatus.data;
        const { name, description, logo, photos, location } = this.state;
        if (!loading) {
            createRestaurant({ name, description, location}, logo, photos);
        }
    }

    pickLocation(e) {
        const { name, logourl } = this.state;
        this.setState({
            label: {
                name: name,
                logo: logourl,
                lat: e.lat,
                lng: e.lng,
            },
            location: { latitude: e.lat, longitude: e.lng }
        })
    }

    clear(flag) {
        if (!flag) {
            this.setState({
                name: '',
                description: '',
                logo: null,
                logourl: null,
                photos: [],
                photosurls: [],
                location: null,
                label: null,
            });
        }
    }

    renderPreview(urls) {
        if (Array.isArray(urls)) {
            return urls.map((url, key) => {
                return (
                    <div key={key}
                        className="restItemImage">
                        <img src={url} alt='photo' />
                    </div>
                );
            });
        }
    }

    render() {
        const { label, logourl, photosurls, show } = this.state;
        return (
            <div>
                <div className="restItemMain" onClick={() => { this.setState({ show: (show) ? false : true }); this.clear(show)}}>
                    <div className="restItemLogo">
                        <img src={defaultllogo} alt="logo" />
                    </div>
                    <h2>Add new restaurant</h2>
                </div>
                <form className={`restForm ${(show) ? 'open' : 'close'}`} onSubmit={e => e.preventDefault()}>
                    <h1>Add your restaurant</h1>
                    <h2>Add name</h2>
                    <input type="text" placeholder="Name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    <h2>Add description</h2>
                    <textarea type="text" placeholder="Description" onChange={(e) => { this.setState({ description: e.target.value }) }} />
                    <h2>Add logo</h2>
                    <div className="restItemLogo imageInput">
                        <img src={(logourl) ? logourl : defaultllogo} alt="input" />
                        <input type='file' accept='image/*' onChange={(e) => { this.chooseLogo(e) }} />
                    </div>
                    <h2>Choose location</h2>
                    <GoogleMap pick={this.pickLocation.bind(this)} labels={(label) ? [label] : []} />
                    <h2>Add photos</h2>
                    <div className="restItemGalary">
                        <div className="restItemImage imageInput addimage">
                            <img src={defaultllogo} alt="input" />
                            <input type='file' accept='image/*' multiple onChange={(e) => { this.choosePhotos(e) }} />
                        </div>
                        {this.renderPreview(photosurls)}
                    </div>
                    <br></br>
                    <input type="submit" onClick={this.submit.bind(this)} value="Apply" />
                </form>
            </div>
        )
    }
}

RestaurantForm.propTypes = {
    restaurantStatus: PropTypes.object,
    createRestaurant: PropTypes.func,
    deleteRestaurant: PropTypes.func,
}

const mapStateToProps = state => ({
    restaurantStatus: state.restaurantStatus
});

const mapDispatchtoProps = dispatch => ({
    createRestaurant: (data, logo, photos) => { dispatch(createRestaurant(data, logo, photos)) },
    deleteRestaurant: (id) => { dispatch(deleteRestaurant(id))}
});

export default connect(mapStateToProps, mapDispatchtoProps)(RestaurantForm);
