import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';

import Header from '../Header/Header';
import UserInfo from './UserInfo/UserInfo'
import Settings from './Settings/Settings'
import Vehicle from './Vehicle/Vehicle';
import License from './License/License';

import uparrow from '../../assets/uparrow.svg';


import { fullroles, allroles } from '../../appconfig';

import { connect } from 'react-redux';
import { getUser } from '../../actions/authaction';
import RestaurantsView from './Restaurant/RestaurantsView';
import DishesView from './Dishes/DishesView';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 'UserInfo',
            arrow: false,
        }
    }

    componentDidMount() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            // this.props.history.replace('/sign-in');
            this.props.getUser();
        }
        if (window) {
            window.addEventListener('scroll', this.scroll.bind(this));
        }
    }
    componentDidUpdate() {
        if (!this.props.userData.user && !this.props.userData.loading) {
            this.props.history.replace('/sign-in');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll.bind(this));
    }

    scroll() {
        const { arrow } = this.state;
        if (!arrow && window.scrollY > 85) {
            this.setState({ arrow: true });
        } else if (arrow && window.scrollY <= 85) {
            this.setState({ arrow: false });
        }
    }

    toUp() {
        if (window) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    renderUpArrow() {
        return (
            <div className={`upArrow ${(this.state.arrow) ? 'arrowShow' : ''}`}
                onClick={this.toUp}>
                <img src={uparrow} alt="altarrow" />
            </div>
        )
    }

    renderToolbar() {
        const { user } = this.props.userData;
        // if (user && user.role === 'driver') {
        //     return (
        //         <div className="ProfToolBar" >
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'UserInfo' }) }}>User Info<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Vehicle' }) }}>Vehicle<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'License' }) }}>License<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Settings' }) }}>Settings<div className="castomHover2line"></div></div>
        //         </div>
        //     )
        // }
        // if (user && user.role === 'owner') {
        //     return (
        //         <div className="ProfToolBar" >
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'UserInfo' }) }}>User Info<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Restaurants' }) }}>Restaurants<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Dishes' }) }}>Dishes<div className="castomHover2line"></div></div>
        //             <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Settings' }) }}>Settings<div className="castomHover2line"></div></div>
        //         </div>
        //     )
        // }
        return (
            <div className="ProfToolBar" >
                <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'UserInfo' }) }}>User Info<div className="castomHover2line"></div></div>
                { user && allroles.get(user.role) === 'Driver' && <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Vehicle' }) }}>Vehicle<div className="castomHover2line"></div></div>}
                { user && allroles.get(user.role) === 'Driver' && <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'License' }) }}>License<div className="castomHover2line"></div></div>}
                { user && fullroles.get(user.role) === 'Owner' && <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Restaurants' }) }}>Restaurants<div className="castomHover2line"></div></div>}
                { user && fullroles.get(user.role) === 'Owner' &&  <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Dishes' }) }}>Dishes<div className="castomHover2line"></div></div>}
                <div className="castomNavLinkDiv2line" onClick={() => { this.setState({ show: 'Settings' }) }}>Settings<div className="castomHover2line"></div></div>
                
            </div>
        )
    }
    renderMain() {
        switch (this.state.show) {
            case 'UserInfo': return <UserInfo />;
            case 'Settings': return <Settings />;
            case 'Vehicle': return <Vehicle />;
            case 'Restaurants': return <RestaurantsView />;
            case 'License': return <License />;
            case 'Dishes': return <DishesView />;
            default: return null;
        }
    }
    render() {
        if (this.props.userData.user) {
            return (
                <div>
                    <Header></Header>
                    {this.renderToolbar()}
                    {this.renderMain()}
                    {this.renderUpArrow()}
                </div>
            );
        }
        return null;
    }
}

Profile.propTypes = {
    history: PropTypes.object,
    userData: PropTypes.object,
    getUser: PropTypes.func,
}

const mapStateToProps = state => ({
    history: state.historyData.history,
    userData: state.userData,
});

const mapDispatchToProps = dispatch => ({
    getUser: () => { dispatch(getUser()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);