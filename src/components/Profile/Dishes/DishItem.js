import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dishes.css';
// import Loading from '../../Loading/Loading';
// import Alert from '../../Alert/Alert';
import PhotoWrap from '../../common/PhotoWrap';

import defaultdish from '../../../assets/default-food.png';

// import { connect } from 'react-redux';
// import { getPhoto } from '../../../actions/photoaction';
// import { getDishesByRestaurant } from '../../../actions/dishaction';

class DishItem extends Component {

    render() {
        const { dish } = this.props;
        const { imageId, name, description, weight, price, cookingTime } = dish;
        return (
            <div key={dish.id} className="card dishItem">
                <h2>{name}</h2>
                <PhotoWrap id={imageId} defaulturl={defaultdish} styles="dishImage"/>
                <div className="dishItemLables">
                    <label><strong>Weight</strong>: {weight}</label>
                    <label><strong>Price</strong>: {price}</label>
                    <label><strong>Time</strong>: {cookingTime}</label>
                </div>
                <h3>Description:</h3>
                <p>{description}</p>
            </div>
        )
    }
}

DishItem.propTypes = {
    dish: PropTypes.object
}

// const mapStateToProps = state => ({
//     // dishesData: state.dishesData,
//     // photosData: state.photosData
// });

// const mapDispatchtoProps = dispatch => ({
//     // getPhoto: (id) => { getPhoto(id) },
//     // getDishesByRestaurant: (id) => { dispatch(getDishesByRestaurant(id)) }
// });

// export default connect(mapStateToProps, mapDispatchtoProps)(DishItem);

export default DishItem;