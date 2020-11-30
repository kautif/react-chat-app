import React from 'react';

import './Input.css';

// if only returning JSX, don't need curly parentheses
const Input = ({message, handleChange, setMessage, sendMessage}) => (
    <form className="chatForm">
        <input 
            className="chatInput"
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button className="sendBtn" onClick={(event) => sendMessage(event)}>Send</button>
    </form>
)

export default Input;