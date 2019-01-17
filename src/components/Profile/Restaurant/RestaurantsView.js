import React, { Component } from 'react';
import PropTypes from 'prop-types'

import "./Restaurant.css";

import { connect } from 'react-redux';


class RestaurantView extends Component {
    constructor(props) {
        super(props);
        this.state = {

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

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(RestaurantView);