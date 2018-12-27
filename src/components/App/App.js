import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';


import './App.css';
import { testRun } from '../../actions/testaction';
import Home   from '../Home/Home';
import SignIn from '../Sign_In/Sign_in';

// test connect redux to react
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount(){
    this.props.runTest('yak vono mene zayebalo...');
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Switch hendler={App}>
          <Route exact path = "/" component= {Home} />
          <Route exact path = "/home" component= {Home} />
          <Route exact path = "/sign-in" component= {SignIn} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  testData: PropTypes.object,
  runTest : PropTypes.func,
  history: PropTypes.object,
}
const mapStateToProps = state => ({
  testData: state.testData, 
  history: state.historyData.history,
}) 
const mapDispatchtoProps = dispatch =>({
  runTest: (mess) => { dispatch(testRun(mess)) },
})

export default connect(mapStateToProps, mapDispatchtoProps)(App);