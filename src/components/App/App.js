import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { testRun } from '../../actions/testaction';
import Home from '../Home/Home';
import SignIn from '../Sign_In/Sign_in';
import SignInForm from '../Sign_In/Sign_in_form';
// import SignInCell from '../Sign_In/Sign_in_Sell/Sign_in_Sell';
// import SignInCust from '../Sign_In/Sign_in_Cust/Sign_in_Cust';
import SignUp from "../Sign_up/Sign_up";
import SignUpForm from '../Sign_up/Sign_up_form';
// import SignUpCell from '../Sign_up/Sign_up_Sell/Sign_up_Sell';
// import SignUpCust from '../Sign_up/Sign_up_Cust/Sign_up_Cust';
import Profile from '../Profile/Profile';

// test connect redux to react
import { connect } from 'react-redux';
import { getUser } from '../../actions/authaction';

class App extends Component {

  componentDidMount() {
    this.props.runTest('yak vono mene zayebalo...');

    // Need to hide preloader when app is load 
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = 'none';

    // Need to get current user if he exist
    this.props.getUser();
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Switch hendler={App}>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-in-cust" render={() => <SignInForm type="customer" />} />
          <Route exact path="/sign-in-driver" render={() => <SignInForm type="driver" />} />
          <Route exact path="/sign-in-owner" render={() => <SignInForm type="owner" />} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-up-cust" render={() => <SignUpForm type="customer" />} />
          <Route exact path="/sign-up-driver" render={() => <SignUpForm type="driver" />} />
          <Route exact path="/sign-up-owner" render={() => <SignUpForm type="owner" />} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  testData: PropTypes.object,
  runTest: PropTypes.func,
  history: PropTypes.object,
  getUser: PropTypes.func,
}
const mapStateToProps = state => ({
  testData: state.testData,
  history: state.historyData.history,
})
const mapDispatchtoProps = dispatch => ({
  runTest: (mess) => { dispatch(testRun(mess)) },
  getUser: () => { dispatch(getUser()) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);