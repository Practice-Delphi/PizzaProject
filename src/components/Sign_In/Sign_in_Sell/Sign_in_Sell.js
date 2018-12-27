import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Sign_in.css';
import { Link } from 'react-router-dom';


class SignInSell extends Component{
    render(){
        return(
            <div >
              <div className=""> 
                <div className="form">
                    <form>
                            <input
                            className="signInInput"
                            type="email" placeholder="Your email adress"
                            onChange={(e) => { this.setState({ userName: e.target.value }) }} />
                                                        <input
                            className="signInInput"
                            type="password" placeholder="Your password"
                            onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </form>
                </div>
              </div>
            </div>
        
        );
    }
}

SignInSell.propTypes = {

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SignInSell);