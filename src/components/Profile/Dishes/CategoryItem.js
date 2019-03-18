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

class CategoryItem extends Component {

    render() {
        const { category, select } = this.props;
        const { imageId, name } = category;
        return (
            <div key={category.id} className="categoryItem" onClick={() => { select(category.id)} }>
                <h2>{name}</h2>
                <PhotoWrap id={imageId} defaulturl={defaultdish} styles="dishImage"/>
            </div>
        )
    }
}

CategoryItem.propTypes = {
    category: PropTypes.object,
    select: PropTypes.func
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

export default CategoryItem;