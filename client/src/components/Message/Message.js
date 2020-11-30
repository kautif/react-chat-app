import React from 'react';

import './Message.css';
import ReactEmoji from 'react-emoji';

// if only returning JSX, don't need curly parentheses
const Message = ({message: {text, user}, name}) => {
    let fromCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        fromCurrentUser = true;
    }

    return (
        fromCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageArea backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
           ) : (
                <div className="messageContainer justifyStart">
                <div className="messageArea backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
            )
        )
}

export default Message;