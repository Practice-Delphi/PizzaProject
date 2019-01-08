import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';

import Header from '../Header/Header';

import { connect } from 'react-redux';
import { getUser } from '../../actions/authaction';

class Profile extends Component {
    
    componentDidMount() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            // this.props.history.replace('/sign-in');
            this.props.getUser();
        }
    }

    componentDidUpdate() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
    }

    render() {
        return (
            <div>
                <Header></Header>
                Profile
            </div>

        );
    }
}

Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    getUser: () => { dispatch(getUser()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);