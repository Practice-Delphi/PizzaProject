import React, { Component } from 'react';
import PropTypes from 'prop-types'

import "./Restaurant.css";

import { connect } from 'react-redux';

import { getRestaurants } from '../../../actions/restaurantaction';


class RestaurantView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { restaurants } = this.props.restaurantsData;
        const { getRestaurants } = this.props;
        if (restaurants && restaurants.length === 0) {
            getRestaurants();
        }
    }
    
    render() {
        return (
            <div>
                Restaurant View
            </div>
        );
    }

}

RestaurantView.propTypes = {
    restaurantsData: PropTypes.object,
    getRestaurants: PropTypes.func,
}

const mapStateToProps = state => ({
    restaurantsData: state.restaurantsData
});

const mapDispatchtoProps = dispatch => ({
    getRestaurants: () => { dispatch(getRestaurants()) },
});

export default connect(mapStateToProps, mapDispatchtoProps)(RestaurantView);