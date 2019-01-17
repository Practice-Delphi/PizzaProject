import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Sign_In/Sign_in.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

class SignUp extends Component{
    render(){
        return(
            <div>
              <Header></Header>
              <div className="signin"> 
                <Link to="/sign-up-sell" className = "linkButton">Sign Up Seller</Link>
                <Link to="/sign-up-driver" className = "linkButton">Sign Up Driver</Link>
                <Link to="/sign-up-cust" className = "linkButton">Sign Up Customer</Link>
              </div>
            </div>
        );
    }
}

SignUp.propTypes = {

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);