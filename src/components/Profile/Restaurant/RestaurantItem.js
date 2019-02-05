import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Restaurant.css';
import defaultllogo from '../../../assets/default-logo.png';
import Loading from '../../Loading/Loading';
import Alert from '../../Alert/Alert';

import { connect } from 'react-redux';
import { getPhoto } from '../../../actions/photoaction';

class RestaurantItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    renderPhoto(id) {
        const { photosData, getPhoto } = this.props;
        if (id && photosData[id]) {
            const { loading, url, error } = photosData[id];
            if (url) {
                return <img src={url} alt='logo' />;
            }
            if (loading) {
                return <Loading />
            }
            if (error) {
                return <Alert local={true} message='Photo dont load' click={() => { getPhoto(id) }} />
            }
            return <img src={defaultllogo} alt='logo' />;
        }
        return <img src={defaultllogo} alt='logo' />;
    }

    renderPhotos(photos) {
        return photos.map((id) => {
            return <div key={id} className="restItemImage">
                {this.renderPhoto(id)}
            </div>
        })
    }

    render() {
        if (!this.props.restaurant) return null;
        const { name, description, logoImageId, images} = this.props.restaurant;
        const { show } = this.state;
        return (
            <div>
                <div className="restItemMain" onClick={() => { this.setState({ show: (show) ? false : true })}}>
                    <div className="restItemLogo">
                        {this.renderPhoto(logoImageId)}
                    </div>
                    <h2>{name}</h2>
                </div>
                <div className={`restItemInfo ${(show) ? 'open' : 'close'}`}>
                    <div className="restItemGalary">
                        {this.renderPhotos(images)}
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        )
    }
}

RestaurantItem.propTypes = {
    restaurant: PropTypes.object,
    photosData: PropTypes.object,
    getPhoto: PropTypes.func
}

const mapStateToProps = state => ({
    photosData: state.photosData
});

const mapDispatchtoProps = dispatch => ({
    getPhoto: (id) => { getPhoto(id) }
});

export default connect(mapStateToProps, mapDispatchtoProps)(RestaurantItem);
