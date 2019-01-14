import React, { Component } from 'react';


import { connect } from 'react-redux';
import './Sign_in.css';
import Header from '../Header/Header'
import { Link } from 'react-router-dom';


class SignIn extends Component{
    render(){
        return(
            <div >
              <Header></Header>
              <div className="signin"> 
                <Link to="/sign-in-sell"  className = "linkButton">Sign In Seller</Link>
                <Link to="/sign-in-cust" className = "linkButton">Sign In Customer</Link>
              </div>
            </div>
        
        );
    }
}

SignIn.propTypes = {

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);