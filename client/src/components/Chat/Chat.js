import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const HOST = 'https://react-chat-app-ak.herokuapp.com/';

    useEffect(() => {
        // location is from react-router. 
            // location.search returns a link
        const {name, room} = queryString.parse(location.search);
        console.log("name: ", name);
        console.log("room: ", room);

        socket = io(HOST);

        setName(name);
        setRoom(room);

        console.log("socket: ", socket);

        socket.emit('join', {name, room}, () => {
            // error retrieved from socket.on from callback in index.js in server
                // error needs to be object and key in parameter
            // alert(error);
        });

        return () => {
            socket.emit('disconnect');

            // Disables this active socket
            socket.off()
        }

        // reconnection only happens if value of array in 2nd parameter changes. 
            // Prevents unnecessary reconnections
    }, [HOST, location.search])

  

    useEffect(() => {
       
        socket.on('message', (message) => {
            console.log('i am running either ways')
            // copies messages array and then adds message at end
            setMessages([...messages, message]);
        }) 
        
        socket.on("roomData", ({users}) => {
            setUsers(users);
        })

        // return () => {
        //     socket.off()
        // }
        // only activates when messages array changes
    })

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('send_msg', message, () => setMessage(''));
        }
       
    }

    const handleChange = e => {
        console.log(e)
    }

    console.log("msg arr: ", messages);
    console.log("msg: ", message);

    // InfoBar is given a property of room and its value is set to room
        // This will be usable from the InfoBar component directly
    return (
        <div className="outerChat">
            <div className="innerChat">
                <InfoBar 
                    room={room}
                />
                <Messages
                    messages={messages}
                    name={name}
                />
                <Input 
                    message={message}
                    handleChange={handleChange}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;