import { useState } from "react";

const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState('');
    const [rideId, setRideId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (joinChatRoom) {
            joinChatRoom(username, rideId);
        } else {
            console.error('joinChatRoom is not defined');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-400 text-center mb-6">Ride Chat</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-gray-300 font-medium mb-2">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                            placeholder="Enter your username"
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                        />
                    </div>
                    <div>
                        <label htmlFor="rideId" className="block text-gray-300 font-medium mb-2">Ride ID</label>
                        <input 
                            type="text" 
                            id="rideId" 
                            value={rideId} 
                            onChange={(e) => setRideId(e.target.value)} 
                            required
                            placeholder="Enter your ride ID"
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
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