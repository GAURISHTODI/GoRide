import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr'; // Import HttpTransportType
import UserNavbar from './User/UserNavbar'; // Import User Navbar
import NavbarDriver from './Driver/NavBarDriver'; // Import Driver Navbar
import * as signalR from "@microsoft/signalr";


const ChatComponent = ({ username, chatroom, role }) => {  // Accept 'role' as prop
    const [conn, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const connect = async () => {
            const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://GoRide.ap-south-1.elasticbeanstalk.com/chathub", {
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
                setConnection(connection); // Save the connection state
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
            setMessage(""); // Clear input field after sending message
        }
    };

    return (
        <>
            {/* Conditionally render navbar based on role */}
            {role === 'user' ? (
                <UserNavbar />
            ) : role === 'driver' ? (
                <NavbarDriver />
            ) : null} {/* Render nothing if no valid role */}

            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 text-center">RideId - {chatroom}</h3>
                <div className="overflow-y-scroll max-h-80 mb-4 p-4 bg-gray-100 rounded-lg border border-gray-300">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-gray-800">{msg}</p>
                        </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatComponent;
