import { useState } from "react";
import "./waitingroom.css"

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [rideId, setRideId] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (joinChatRoom) {
            joinChatRoom(username, rideId);
        } else {
            console.error('joinChatRoom is not defined');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bgch">
            <div className="bgch2 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-400 text-center mb-6">Ride Chat</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block tch3 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            style={{
                                backgroundColor: "#1f1f1f",
                                color: `${isFocused ? "#f0ecfc" : "#9e7aff"}`,
                                border: `2px solid ${isFocused ? "#9e7aff" : "#534a6a"}`,
                                padding: "8px",
                                borderRadius: "5px",
                                width: "100%",
                                outline: "none", // Removes default browser outline
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="rideId" className="block tch3 font-medium mb-2">Ride ID</label>
                        <input
                            type="text"
                            id="rideId"
                            value={rideId}
                            onChange={(e) => setRideId(e.target.value)}
                            required
                            placeholder="Enter your ride ID"
                            onFocus={() => setIsFocused2(true)}
                            onBlur={() => setIsFocused2(false)}
                            style={{
                                backgroundColor: "#1f1f1f",
                                color: `${isFocused2 ? "#f0ecfc" : "#9e7aff"}`,
                                border: `2px solid ${isFocused2 ? "#9e7aff" : "#534a6a"}`,
                                padding: "8px",
                                borderRadius: "5px",
                                width: "100%",
                                outline: "none", // Removes default browser outline
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white font-medium py-3 rounded-lg hover:bg-purple-600 transition duration-300"
                    >
                        Join Chat
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-gray-400 text-sm">Connect with your ride companions</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WaitingRoom;