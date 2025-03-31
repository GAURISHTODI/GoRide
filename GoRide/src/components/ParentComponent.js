import React, { useState, useEffect } from "react";
import WaitingRoom from "./waitingroom";
import ChatComponent from "./ChatComponent";
import NavbarDriver from "./Driver/NavBarDriver";
import UserNavbar from "./User/UserNavbar";

const ParentComponent = () => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [role, setRole] = useState('');

    // Fetch the role from localStorage when the component mounts
    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        console.log("Stored Role: ", storedRole);  // Check if the role is correct
        setRole(storedRole || 'user'); // Default to 'user' if no role is found
    }, []);

    const joinChatRoom = (username, chatroom) => {
        setUsername(username);
        setChatroom(chatroom);
        setShowChat(true);  // Show chat after joining room
    };

    return (
        <>
            {/* Navbar based on role */}
            {role === 'user' ? (
                <UserNavbar />  // Render UserNavbar if role is 'user'
            ) : role === 'driver' ? (
                <NavbarDriver />  // Render DriverNavbar if role is 'driver'
            ) : null}  {/* Default to nothing if no valid role */}

            <div>
                {!showChat ? (
                    <WaitingRoom joinChatRoom={joinChatRoom} />
                ) : (
                    <ChatComponent username={username} chatroom={chatroom} />
                )}
            </div>
        </>
    );
};

export default ParentComponent;
