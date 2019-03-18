import React, { Component }from 'react';
import PropTypes from 'prop-types';
import "./Settings.css";

import settingssvg from '../../assets/settings.svg';

class SettingsButtonWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    render() {
        const { children, styles, liststyles } = this.props;
        const { open } = this.state;
        return (
            <div className={`set-main ${styles}`}>
                <div className="set-icon" onClick={() => { this.setState({ open: open ? false : true })}}>
                    <img src={settingssvg} alt="settings-icon"/>
                </div>
                <div className={`container col ai-stretch jc-stretch set-list ${(liststyles) ? liststyles : ''} ${open ? 'set-open' : ''}`}>
                    {children}
                </div>
            </div>
        )
    }
}

SettingsButtonWrap.propTypes = {
   styles: PropTypes.string,
}

export default SettingsButtonWrap;