import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Dishes.css';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';
import PhotoInputWrap from "../../common/PhotoInputWrap";
import TextError from "../../common/TextError";

import defaultcategory from '../../../assets/default-food.png';

import { connect } from 'react-redux';
import { createCategoryByRestaurant } from '../../../actions/dishaction';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            file: null
        }
    }
    submit() {
        const { name, file } = this.state;
        const { restId, create, categoryStatus } = this.props;
        const { loading } = categoryStatus;
        if (!loading) create(restId, name, file);
    }

    render() {
        const { loading, error, success } = this.props.categoryStatus;
        return (
            <form className="container col ai-center card categoryForm" onSubmit={ e => e.preventDefault() }>
                <h1>Add category</h1>
                <h2>Add Category Image</h2>
                <PhotoInputWrap styles="dishImage" alt="categoryphoto" defaulturl={defaultcategory} callback={(file) => { this.setState({ file })}}/>
                <h2>Add Category Name</h2>
                <input type="text" onChange={(e) => { this.setState({name: e.target.value })}}/>
                { !loading && error && <TextError error={error}/>}
                { !loading && success && <TextError success={success}/>}
                { loading && <Loading />}
                { !loading && <input type="submit" onClick={this.submit.bind(this)}/> }
            </form>
        )
    }
}

CategoryList.propTypes = {
   restId: PropTypes.string,
   categoryStatus: PropTypes.object,
   create:PropTypes.func,
}

const mapStateToProps = state => ({
    categoryStatus: state.categoryStatus
});

const mapDispatchtoProps = dispatch => ({
    create: (restId, name, image) => { dispatch(createCategoryByRestaurant(restId, name, image)) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(CategoryList);
