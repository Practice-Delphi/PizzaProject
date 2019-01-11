import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { chengeUserData } from '../../../actions/chengeaction';


class ProfileData extends Component {

    constructor(props){
        super(props);
        this.state ={
            firstName : null,
            lastName: null,
            phoneNumber: null,
            password: null,
            confirmpassword: null,
            currentPassword: null,

        } 
    }

    confirmChange(){
        if (this.state.firstName ) {
            this.props.chengeUserData({
                firstName : this.state.firstName ,
            })
        }
        if (this.state.lastName ) {
            this.props.chengeUserData({
                lastName : this.state.lastName ,
            })
        }
        if (this.state.phoneNumber ) {
            this.props.chengeUserData({
                phoneNumber : this.state.phoneNumber ,
            })
        }
    }
    
    
    render () {
        if (this.props.userData.user) {
            return (
                <div>
                    <div>
                        <h1>Name</h1>
                        <input type="text" placeholder="first Name"  onChange={(e) => { this.setState({ firstName: e.target.value }) }}/>
                        <input type="text" placeholder="last Name"   onChange={(e) => { this.setState({ lastName: e.target.value  }) }}/>
                    </div>
                    <div>
                        <h1>Phone Namber</h1>
                        <input type="text" placeholder="Phone Namber"  onChange={(e) => {this.setState( {phoneNumber: e.target.value} )} }/>
                    </div>
                    <div>
                        <h1>Password</h1>
                        <h3>current Password</h3>
                        <input type="text" placeholder="currentPassword"  onChange={(e) => {this.setState( {phoneNumber: e.target.value} )} }/>
                        <h3>New Password</h3>
                        <input type="text" placeholder="password"  onChange={(e) => {this.setState( { password: e.target.value} )} }/>
                        <input type="text" placeholder="confirmpassword"  onChange={(e) => {this.setState( {confirmpassword: e.target.value} )} }/>
                    </div>
                    <div className="SubmtButton">
                        <button onClick={this.confirmChange.bind(this)}>SUBMIT</button>
                    </div>
    
                </div>
            )
        }
    }
}
ProfileData.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,

}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
    chengeddata: state.chengeddata,
});

const mapDispatchtoProps = dispatch => ({
    chengeUserData: (data) => { dispatch(chengeUserData(data)) },
})

export default connect(mapStateToProps, mapDispatchtoProps) (ProfileData);
