import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Restaurant.css";
import GoogleMap from "../../GoogleMap/GoogleMap";
import defaultllogo from "../../../assets/default-logo.png";
import Photo from "../../common/Photo";
import PreviewWrap from '../../common/PreviewWrap';

import { connect } from "react-redux";
import {
  createRestaurant,
  deleteRestaurant
} from "../../../actions/restaurantaction";

class RestaurantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      logo: null,
      logourl: null,
      photos: [],
      photosurls: [],
      location: null,
      label: null,
      show: false
    };
  }

  choosePhotos(e) {
    const files = e.target.files;
    if (files) {
      [...files].forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            photosurls: [...this.state.photosurls, reader.result]
          });
        };
        reader.readAsDataURL(file);
      });

      this.setState({
        photos: [...this.state.photos, ...files]
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
        logo: file
      });
    }
  }

  submit() {
    const { createRestaurant } = this.props;
    const { loading } = this.props.restaurantStatus.data;
    const { name, description, logo, photos, location } = this.state;
    if (!loading) {
      createRestaurant({ name, description, location }, logo, photos);
    }
  }

  pickLocation(e) {
    const { name, logourl } = this.state;
    this.setState({
      label: {
        name: name,
        logo: logourl,
        lat: e.lat,
        lng: e.lng
      },
      location: { latitude: e.lat, longitude: e.lng }
    });
  }

  clear(flag) {
    if (!flag) {
      this.setState({
        name: "",
        description: "",
        logo: null,
        logourl: null,
        photos: [],
        photosurls: [],
        location: null,
        label: null
      });
    }
  }

  render() {
    const { label, logourl, photosurls, show } = this.state;
    return (
      <div className="restItemContainer">
        <div
          className="card restItemMain"
          onClick={() => {
            this.setState({ show: show ? false : true });
            this.clear(show);
          }}
        >
          <Photo styles={`logo round`} url={defaultllogo} alt="logo" />
          <h2>Add new restaurant</h2>
        </div>
        <form
          className={`card restForm ${show ? "ri-open" : "ri-close"}`}
          onSubmit={e => e.preventDefault()}
        >
          <h1>Add your restaurant</h1>
          <h2>Add name</h2>
          <input
            type="text"
            placeholder="Name"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <h2>Add description</h2>
          <textarea
            type="text"
            placeholder="Description"
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
          />
          <h2>Add logo</h2>
          <Photo
            styles={`logo round imageInput`}
            url={logourl ? logourl : defaultllogo}
            alt="preview"
          >
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                this.chooseLogo(e);
              }}
            />
          </Photo>
          <h2>Choose location</h2>
          <GoogleMap pick={this.pickLocation.bind(this)} labels={label ? [label] : []}/>
          <h2>Add photos</h2>
          <div className="restItemGalary">
            <Photo styles="restItemImage imageInput addimage" url={defaultllogo} alt="preview">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => {
                  this.choosePhotos(e);
                }}
              />
            </Photo>
            <PreviewWrap urls={photosurls} styles={`restItemImage`} alt="preview"/>
          </div>
          <br />
          <input type="submit" onClick={this.submit.bind(this)} value="Apply" />
        </form>
      </div>
    );
  }
}

RestaurantForm.propTypes = {
  restaurantStatus: PropTypes.object,
  createRestaurant: PropTypes.func,
  deleteRestaurant: PropTypes.func
};

const mapStateToProps = state => ({
  restaurantStatus: state.restaurantStatus
});

const mapDispatchtoProps = dispatch => ({
  createRestaurant: (data, logo, photos) => {
    dispatch(createRestaurant(data, logo, photos));
  },
  deleteRestaurant: id => {
    dispatch(deleteRestaurant(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(RestaurantForm);
