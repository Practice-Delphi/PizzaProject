import React, { Component } from 'react';
import PropTypes from "prop-types";
import './GoogleMap.css';

import Photo from '../common/Photo';

import GoogleMapReact from 'google-map-react';
import defaultllogo from '../../assets/default-logo.png';
import { googleApiKey } from '../../appconfig';

import { connect } from 'react-redux';

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initcenter: {
                lat: 49.23,
                lng: 28.46
            },
            initzoom: 13
        }
    }

    renderLabels(labels) {
        if (Array.isArray(labels) && labels.length > 0) {
            return labels.map((label, key) => {
                return (
                    <Label key={key} lat={label.lat}
                        lng={label.lng}
                        name={label.name}
                        logo={label.logo}/>
                );
            })
        }   
        return null;
    }
    render() {
        const { initzoom, initcenter } = this.state;
        const { center, zoom, pick, labels } = this.props;
        return (
            <div className="mapContainer">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleApiKey }}
                    defaultCenter={(center) ? center : initcenter }
                    defaultZoom={(zoom) ? zoom : initzoom}
                    onClick={(pick) ? pick: null}>
                    {this.renderLabels(labels)}
                </GoogleMapReact>
            </div>
        );
    }
}

const Label = ({ name, logo, key }) => {
    return (
        <div key={key} className="labelContainer">
            <div className='labelText'>
                {name}
            </div>
            <Photo styles="label round" url={logo ? logo : defaultllogo}/>
            <div className="labelShape"></div>
        </div>
    );
}

GoogleMap.propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
    }),
    pick: PropTypes.func,
    labels: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
        logo: PropTypes.string,
    }))
}

const mapStateToProps = state => ({
})

const mapDispatchtoProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchtoProps)(GoogleMap);