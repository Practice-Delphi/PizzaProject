import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Restaurant.css";
import defaultllogo from "../../../assets/default-logo.png";
// import Loading from "../../Loading/Loading";
// import Alert from "../../Alert/Alert";
import PhotoWrap from '../../common/PhotoWrap';

// import { connect } from "react-redux";
// import { getPhoto } from "../../../actions/photoaction";

class RestaurantItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  renderPhotos(photos) {
    return photos.map(id => {
      return <PhotoWrap key={id} id={id} styles="restItemImage" defaultlurl={defaultllogo} alt="restaurant-image"/>;
    });
  }

  render() {
    if (!this.props.restaurant) return null;
    const { name, description, logoImageId, images } = this.props.restaurant;
    const { show } = this.state;
    return (
      <div>
        <div
          className="card restItemMain"
          onClick={() => {
            this.setState({ show: show ? false : true });
          }}
        >
          <PhotoWrap id={logoImageId} styles="logo round" defaultlurl={defaultllogo} alt="logo-image"/>
          <h2>{name}</h2>
        </div>
        <div className={`card restItemInfo ${show ? "ri-open" : "ri-close"}`}>
          <div className="restItemGalary">{this.renderPhotos(images)}</div>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

RestaurantItem.propTypes = {
  restaurant: PropTypes.object,
};

// const mapStateToProps = state => ({
// });

// const mapDispatchtoProps = dispatch => ({

// });

// export default connect(
//   mapStateToProps,
//   mapDispatchtoProps
// )(RestaurantItem);

export default RestaurantItem;