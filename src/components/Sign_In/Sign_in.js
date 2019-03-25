import React, { Component } from 'react';
import PropTypes from 'prop-types'
import qs from 'query-string';
import './Sign_in.css';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUserBySocial } from '../../actions/authaction'

class SignIn extends Component {

  
  componentWillMount() {
    if (this.props.location) {
      // const type = qs.parse(this.props.location.search).type;
      const authToken = qs.parse(this.props.location.search).authToken;
      const refreshToken = qs.parse(this.props.location.search).refreshToken;
      this.props.loginUserBySocial(authToken, refreshToken);
    }
  }

  // componentDidMount() {
  //   if (this.props.location) {
  //     const type = qs.parse(this.props.location.search).type;
  //     const authToken = qs.parse(this.props.location.search).authToken;
  //     const refreshToken = qs.parse(this.props.location.search).refreshToken;
  //     this.props.loginUserBySocial(authToken, refreshToken);
  //   }
  // }

  componentDidUpdate() {
    if (this.props.userData.user) {
      this.props.history.replace('/profile');
    }
  }

  render() {
    return (
      <div >
        <Header></Header>
        <div className="signin">
          <Link to="/sign-in-owner" className="linkButton">Sign In Owner</Link>
          <Link to="/sign-in-driver" className="linkButton">Sign In Driver</Link>
          <Link to="/sign-in-cust" className="linkButton">Sign In Customer</Link>
        </div>
      </div>

    );
  }
}

SignIn.propTypes = {
  loginUserBySocial: PropTypes.func,
  userData: PropTypes.object,
  history: PropTypes.object,
}

const mapStateToProps = state => ({
  history: state.historyData.history,
  userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
  loginUserBySocial: (token, refresh) => { dispatch(loginUserBySocial(token, refresh)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);