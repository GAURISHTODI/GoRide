import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import UserNavbar from './User/UserNavbar';
import NavbarDriver from './Driver/NavBarDriver';
import * as signalR from "@microsoft/signalr";

const ChatComponent = ({ username, chatroom, role }) => {
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const connect = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://goride.ap-south-1.elasticbeanstalk.com/chathub", {
                    transport: signalR.HttpTransportType.WebSockets
                })
                .withAutomaticReconnect()
                .build();
            
            connection.on("ReceiveMessage", (msg) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            try {
                await connection.start();
                await connection.invoke("JoinChatRoom", username, chatroom);
                setConnection(connection);
            } catch (err) {
                console.error('Error starting connection: ', err);
            }
        };

        connect();

        return () => {
            if (conn) {
                conn.stop();
            }
        };
    }, [username, chatroom]);

    const handleSendMessage = async () => {
        if (message && conn) {
            await conn.invoke("SendMessageToChatRoom", username, chatroom, message);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            {/* Conditionally render navbar based on role */}
            {role === 'user' ? (
                <UserNavbar />
            ) : role === 'driver' ? (
                <NavbarDriver />
            ) : null}

            {/* Main chat container - using flex-1 to fill remaining space */}
            <div className="flex-1 flex flex-col p-4 md:p-6">
                <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col max-w-4xl mx-auto w-full flex-1">
                    <h3 className="text-2xl font-semibold text-purple-400 p-4 text-center border-b border-gray-700">
                        Ride Chat - {chatroom}
                    </h3>
                    
                    {/* Messages container with flex-1 to fill available space */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className="mb-3 bg-gray-700 p-3 rounded-lg">
                                    <p className="text-gray-200">{msg}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-400 italic">No messages yet. Start the conversation!</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Message input area */}
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 focus:outline-none"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;