import React, { Component } from 'react';
import './Loading.css';

import pizza1 from './pizza11.png';
import pizza2 from './pizza22.png';
import pizza3 from './pizza33.png';
import pizza4 from './pizza44.png';
import pizza5 from './pizza55.png';
import pizza6 from './pizza66.png';

class Loading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.global) {
            return (
                <div className="container">
                    <div className="main">
                        <img src={pizza1} className="slice pizza1" />
                        <img src={pizza2} className="slice pizza2" />
                        <img src={pizza3} className="slice pizza3" />
                        <img src={pizza4} className="slice pizza4" />
                        <img src={pizza5} className="slice pizza5" />
                        <img src={pizza6} className="slice pizza6" />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="containerlocal">
                    <div className="main">
                        <div className="circle"></div>
                    </div>
                </div>
            );
        }
    }
}

export default Loading;