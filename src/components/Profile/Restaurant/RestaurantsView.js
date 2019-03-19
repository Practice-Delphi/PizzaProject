import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Restaurant.css";
import GoogleMap from "../../GoogleMap/GoogleMap";
import defaultllogo from "../../../assets/default-logo.png";

import Loading from "../../Loading/Loading";
import Alert from "../../Alert/Alert";
import RestaurantItem from "./RestaurantItem";

import { connect } from "react-redux";

import { getRestaurants } from "../../../actions/restaurantaction";
import { getPhoto } from "../../../actions/photoaction";
import RestaurantForm from "./RestaurantForm";

class RestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
    };
  }

  componentDidMount() {
    const { restaurants } = this.props.restaurantsData;
    const { getRestaurants } = this.props;
    if (restaurants && restaurants.length === 0) {
      getRestaurants();
    }
  }

  mapRestaurantsToMap(restaurants) {
    const { photosData } = this.props;
    return restaurants.map(restaurant => {
      const { logoImageId } = restaurant;
      return {
        name: restaurant.name,
        lat: restaurant.location.latitude,
        lng: restaurant.location.longitude,
        logo:
          photosData[logoImageId] && photosData[logoImageId].url
            ? photosData[logoImageId].url
            : defaultllogo
      };
    });
  }

  renderItems(restaurants) {
    return restaurants.map(restaurant => {
      return (
        <li key={restaurant.id}>
          <RestaurantItem restaurant={restaurant} />
        </li>
      );
    });
  }

  renderList(restaurants) {
    return (
      <ul className="restList">
        <RestaurantForm key="restaurant-form"/>
        {this.renderItems(restaurants)}
      </ul>
    );
  }

  renderMap(restaurants) {
    return (
      <div className="card restMap">
        <GoogleMap labels={this.mapRestaurantsToMap.call(this, restaurants)} />
      </div>
    );
  }

  render() {
    const { restaurants, loading, error } = this.props.restaurantsData;
    const { getRestaurants } = this.props;
    return (
      <div className="container-global col center restContainer">
        <h1>Your restaurants</h1>
        {loading && <Loading />}
        { !loading && error && (
          <Alert
            message="Restaurants don`t load"
            click={() => {
              getRestaurants();
            }}
          />
        )}
        { !loading && !error && Array.isArray(restaurants) && this.renderMap(restaurants)}
        { !loading && !error && Array.isArray(restaurants) && this.renderList(restaurants)}
      </div>
    );
  }
}

RestaurantView.propTypes = {
  restaurantsData: PropTypes.object,
  photosData: PropTypes.object,
  getRestaurants: PropTypes.func,
  getPhoto: PropTypes.func
};

const mapStateToProps = state => ({
  restaurantsData: state.restaurantsData,
  photosData: state.photosData
});

const mapDispatchtoProps = dispatch => ({
  getRestaurants: () => {
    dispatch(getRestaurants());
  },
  getPhoto: id => {
    dispatch(getPhoto(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(RestaurantView);
