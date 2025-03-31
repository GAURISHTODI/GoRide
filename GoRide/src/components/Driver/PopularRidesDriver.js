import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDriver from "./NavBarDriver";

const PopularRidesDriver = () => {
    const [rides, setRides] = useState([]);
    const driverId = localStorage.getItem('id');
    console.log("Driver ID from localStorage:", driverId); // Log the driverId to check
    
    useEffect(() => {
        const fetchUserRides = async () => {
            try {
                const response = await axios.get(`http://GoRide.ap-south-1.elasticbeanstalk.com/api/Rides/myrides/${driverId}`);
                setRides(response.data);
            } catch (error) {
                console.error("Error fetching rides:", error);
            }
        };
    
        if (driverId) {
            fetchUserRides();
        } else {
            console.error("Driver ID not found in localStorage");
        }
    }, [driverId]);
    

    return (
        <>
        <NavbarDriver/>
        <div className="min-h-screen bg-white p-6">
            <div className="bg-blue-50 shadow-lg rounded-2xl p-8 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Your Published Rides</h1>
                {rides.length > 0 ? (
                    <ul className="space-y-4">
                        {rides.map(ride => (
                            <li key={ride.rideId} className="bg-white p-4 rounded-lg shadow border border-blue-200">
                                <p className="text-lg font-semibold text-blue-600">Route: <span className="text-gray-800">{ride.route}</span></p>
                                <p className="text-md text-gray-700">Date: {ride.date}</p>
                                <p className="text-md text-gray-700">Price: ₹{ride.price}</p>
                                <p className="text-md text-gray-700">Passengers: {ride.passengers}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-700">No rides published yet.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default PopularRidesDriver;
