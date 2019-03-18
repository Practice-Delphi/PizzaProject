import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dishes.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import DishItem from './DishItem';

import { connect } from 'react-redux';
import { getDishesByCategory } from '../../../actions/dishaction';

class DishesList extends Component {


    componentDidUpdate() {
        const { categoryId, getDishesByCategory, dishesData } = this.props;
        if (categoryId && !dishesData[categoryId]) {
            getDishesByCategory(categoryId);
        }
    }
    render() {
        const { categoryId, dishesData, getDishesByCategory } = this.props;
        const dishes = (dishesData[categoryId] && dishesData[categoryId].dishes) ? dishesData[categoryId].dishes : null;
        const loading = (dishesData[categoryId] && dishesData[categoryId].loading) ? dishesData[categoryId].loading : false;
        const error = (dishesData[categoryId] && dishesData[categoryId].error) ? dishesData[categoryId].error : null;
        return (
            <div className="dishesList">
                {loading && <Loading />}
                { error && <Alert message='Dishes don`t load' click={() => { getDishesByCategory(categoryId) }} />}
                {!loading && !error && Array.isArray(dishes) && dishes.map(dish => {
                    return <DishItem key={dish.id} dish={dish}/>
                })}
            </div>
        )
    }
}

DishesList.propTypes = {
    categoryId: PropTypes.string,
    getDishesByCategory: PropTypes.func,
    dishesData: PropTypes.object,
}

const mapStateToProps = state => ({
    dishesData: state.dishesData,
});

const mapDispatchtoProps = dispatch => ({
    getDishesByCategory: (id) => { dispatch(getDishesByCategory(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(DishesList);
