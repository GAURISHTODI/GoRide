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
        <div className="flex justify-center items-center min-h-screen bg-blue-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Join Ride Chat</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-semibold">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="rideId" className="block text-gray-700 font-semibold">Ride ID</label>
                        <input 
                            type="text" 
                            id="rideId" 
                            value={rideId} 
                            onChange={(e) => setRideId(e.target.value)} 
                            required
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Join Chat
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WaitingRoom;
