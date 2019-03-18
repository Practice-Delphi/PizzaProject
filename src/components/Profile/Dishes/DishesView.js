import React, { Component } from 'react';
import PropTypes from 'prop-types'

import "./Dishes.css";

import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import CategoryList from './CategoryList';
import DishesList from './DishesList';

import { connect } from 'react-redux';

import { getCategoryByRestaurant } from '../../../actions/dishaction';
import { getRestaurants } from '../../../actions/restaurantaction';


class DishesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurantId: null,
            selectedCategoryId: null,
        }
    }

    componentDidMount() {
        const { restaurants } = this.props.restaurantsData;
        const { getRestaurants } = this.props;
        if (restaurants && restaurants.length === 0) {
            getRestaurants();
        }
    }

    renderOptions(restaurants) {
        return restaurants.map((restaurant) => {
            return <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
        });
    }

    renderSelect(restaurants) {
        return (
            // <div className="card dishRestaurantSelect">
            //     <h1>Choose restaurant</h1>
                <select onChange={(e) => { this.setState({ selectedRestaurantId: e.target.value }) }}>
                    <option></option>
                    {this.renderOptions(restaurants)}
                </select>
            // </div>
        )
    }

    render() {
        const { restaurants, loading, error } = this.props.restaurantsData;
        const { getRestaurants } = this.props;
        return (
            <div className="container col ai-stretch dishContainer">
                <div className="container col ai-stretch card dishRestaurantSelect">
                    <h1>Choose restaurant</h1>
                    { loading && <Loading /> }
                    { !loading && error && <Alert message='Restaurants don`t load' click={() => { getRestaurants() }} /> }
                    { !loading && !error && Array.isArray(restaurants) && this.renderSelect(restaurants) }
                </div>
                <CategoryList restId={this.state.selectedRestaurantId} select={(id) => { this.setState({ selectedCategoryId: id })}}/>
                <DishesList categoryId={this.state.selectedCategoryId}/>
            </div>
        );
    }
}

DishesView.propTypes = {
    getCategoryByRestaurant: PropTypes.func,
    restaurantsData: PropTypes.object,
    getRestaurants: PropTypes.func,
}

const mapStateToProps = state => ({
    restaurantsData: state.restaurantsData,
});

const mapDispatchtoProps = dispatch => ({
    getRestaurants: () => { dispatch(getRestaurants()) },
    getCategoryByRestaurant: (id) => { dispatch(getCategoryByRestaurant(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(DishesView);