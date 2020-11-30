import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

// if only returning JSX, don't need curly parentheses
const InfoBar = ({room}) => (
    <div className="infoBar">
        <div className="leftInner">
            <img className="onlineIcon" src={onlineIcon} alt="online indicator" />
            <h3>{room}</h3>
        </div>
        <div className="rightInner">
            <a href="/"><img src={closeIcon} alt="close icon" /> </a>
        </div>
    </div>
)

export default InfoBar;