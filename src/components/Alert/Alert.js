import React, { Component } from 'react';
import './Alert.css';
import refreshsvg from '../../assets/refresh.svg';

class Alert extends Component {
    componentDidMount() {
        console.log(this.props.click);
    }
    render() {
        if (this.props.message) {
            return (
                <div className='alertlocalcontainer'>
                    <div className='alertlocalmain'>
                        <div className='alertlocaltext'>
                            {this.props.message}
                        </div>
                    </div>
                    <div className='refreshBtn' onClick={this.props.click}>
                        <img src={refreshsvg} alt='Try again' />
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default Alert;