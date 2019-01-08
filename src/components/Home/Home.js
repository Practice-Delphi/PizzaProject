import React, { Component } from 'react';

import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import './Home.css';

import Header from '../Header/Header'


class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header></Header>
                <div className="home-tokenbanner content">
                    <div className="tokenbaner-title">
                        <h1>Earn tokens with food trading? We say yes.</h1>
                        <h2>Revolutionizing <span>food</span> with the blockchain.</h2>
                        <h2><NavLink to={'sign-in'}>Sign in</NavLink> and begin live in future now.</h2>
                    </div>
                </div>
                <div className="home-howit content">
                    <h1>How it works</h1>
                    <div className="howit-grid">
                        <div className="howit-seller">
                            <div className="howit-title">
                                <h2>Seller</h2>
                                <div className="howit-title-border"></div>
                            </div>
                            <div className="howit-usecase">
                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>1</label>
                                        <h3>Create your restaurant</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>2</label>
                                        <h3>Add your dishes</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>3</label>
                                        <h3>Public your orders</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>4</label>
                                        <h3>Earn tokens</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>
                            </div>
                        </div>

                        <div className="howit-driver">
                            <div className="howit-title">
                                <h2>Driver</h2>
                                <div className="howit-title-border"></div>
                            </div>
                            <div className="howit-usecase">
                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>1</label>
                                        <h3>Download App</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>2</label>
                                        <h3>Take orders</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>3</label>
                                        <h3>Deliver food</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>4</label>
                                        <h3>Earn tokens</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>
                            </div>
                        </div>

                        <div className="howit-customer">
                            <div className="howit-title">
                                <h2>Customer</h2>
                                <div className="howit-title-border"></div>
                            </div>
                            <div className="howit-usecase">
                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>1</label>
                                        <h3>Download App</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>2</label>
                                        <h3>Choose your meal</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>3</label>
                                        <h3>Create order</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>

                                <div className="usecase">
                                    <div className="usecase-title">
                                        <label>4</label>
                                        <h3>Pay with tokens</h3>
                                    </div>
                                    <p>Desc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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