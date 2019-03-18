import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dishes.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import CategoryItem  from './CategoryItem';

import { connect } from 'react-redux';
import { getCategoryByRestaurant } from '../../../actions/dishaction';

class CategoryList extends Component {

    componentDidUpdate() {
        const { restId, getCategoryByRestaurant, categoryData } = this.props;
        if (restId && !categoryData[restId]) {
            getCategoryByRestaurant(restId);
        }
    }

    render() {
        const { restId, select,  categoryData, getCategoryByRestaurant } = this.props;
        const category = (categoryData[restId] && categoryData[restId].category) ? categoryData[restId].category : null;
        const loading = (categoryData[restId] && categoryData[restId].loading) ? categoryData[restId].loading : false;
        const error = (categoryData[restId] && categoryData[restId].error) ? categoryData[restId].error : null;
        return (
            <div className="card categoryContainer">
                <h1>Categories</h1>
                {loading && <Loading />}
                { error && <Alert message='Category don`t load' click={() => { getCategoryByRestaurant(restId) }} />}
                {!loading && !error && Array.isArray(category) && 
                <div className="categoryList">
                    {category.map(cat => {
                        return <CategoryItem key={cat.id} category={cat} select={select}/>
                    })}
                </div>}
            </div>
        )
    }
}

CategoryList.propTypes = {
    restId: PropTypes.string,
    getCategoryByRestaurant: PropTypes.func,
    categoryData: PropTypes.object,
    select: PropTypes.func
}

const mapStateToProps = state => ({
    categoryData: state.categoryData,
});

const mapDispatchtoProps = dispatch => ({
    getCategoryByRestaurant: (id) => { dispatch(getCategoryByRestaurant(id)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(CategoryList);
