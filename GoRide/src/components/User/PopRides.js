import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentComponent from '../Payments/PaymentComponent';
import * as signalR from "@microsoft/signalr";


const PopularRidesUser = () => {
    const [selectedRide, setSelectedRide] = useState(null);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [userId, setUserId] = useState(null);
    const [successfulBookings, setSuccessfulBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const uid = localStorage.getItem("id");
        if (uid) setUserId(uid);
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await axios.get('http://GoRide.ap-south-1.elasticbeanstalk.com/api/Rides');
            const currentDate = new Date();
            const filteredRides = response.data.filter(ride => new Date(ride.date.split(' at ')[0]) > currentDate);
            setUpcomingRides(filteredRides);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    const handleBookNow = (ride) => setSelectedRide(ride);

    const handlePaymentSuccess = (rideId, driverId, driverName) => {
        setSuccessfulBookings([...successfulBookings, rideId]);
        joinRideChatRoom(rideId, driverId, userId);
    };

    const joinRideChatRoom = async (rideId, driverId, username) => {
        try {
            const conn = new window.signalR.HubConnectionBuilder()
                .withUrl(`https://localhost:44345/chathub`)
                .configureLogging(window.signalR.LogLevel.Information)
                .build();
            
            conn.on("ReceiveMessage", (message) => console.log("Received message:", message));
            await conn.start();
            await conn.invoke("JoinRideChatRoom", username, rideId, driverId);
        } catch (error) {
            console.error("Error joining chat room:", error);
        }
    };

    const handleChatNavigation = (rideId, driverName) => {
        navigate(`/chat?rideId=${rideId}&userId=${userId}&driverName=${driverName}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Upcoming Rides</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {upcomingRides.length > 0 ? (
                    upcomingRides.map((ride, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105">
                            <div>
                                <h3 className="font-bold text-lg mb-2">{ride.route}</h3>
                                <p className="text-sm text-gray-600">Date: {ride.date}</p>
                                <p className="text-sm text-gray-600">Driver: {ride.driverName}</p>
                                <p className="text-sm text-gray-600">Price: ₹{ride.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-600">Remaining Seats: {ride.remainingPassengers}</p>
                            </div>
                            <button
                                className={`mt-4 py-2 px-4 rounded-xl text-white ${ride.remainingPassengers > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                onClick={() => handleBookNow(ride)}
                                disabled={ride.remainingPassengers <= 0}
                            >
                                {ride.remainingPassengers > 0 ? 'Book Now' : 'No Seats Left'}
                            </button>
                            {successfulBookings.includes(ride.id) && (
                                <button
                                    className="mt-4 py-2 px-4 rounded-xl text-white bg-green-600 hover:bg-green-700"
                                    onClick={() => handleChatNavigation(ride.id, ride.driverName)}
                                >
                                    Chat with Driver
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No upcoming rides available.</p>
                )}
            </div>
            {selectedRide && (
                <PaymentComponent
                    amount={selectedRide.price}
                    rideId={selectedRide.id}
                    userId={userId}
                    driverId={selectedRide.driverId}
                    driverName={selectedRide.driverName}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default PopularRidesUser;
