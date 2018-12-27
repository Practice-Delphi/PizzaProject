import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Home.css';

import Header from '../Header/Header'


class Home extends Component{
    render(){
        return(
            <div className="home">
              <Header></Header>
              <h1>Here we write some main text</h1>
            </div>
        
        );
    }
}

Home.propTypes = {

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);