import React from 'react';

import './TextContainer.css';
import onlineIcon from '../../icons/onlineIcon.png';

const TextContainer = ({users}) => {
    return (
        <div className="textContainer">
            {
                users ?
                (
                    <div>
                        <h1>Current chatters</h1>
                        <div className="chattersContainer">
                            <h2>
                                {users.map(({name}) => 
                                    <div key={name} className="chatter">
                                        {name}
                                        <img src={onlineIcon} alt="online icon" />
                                    </div>
                                )}
                            </h2>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
};

export default TextContainer;