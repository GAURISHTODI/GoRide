import React, { useEffect, useState } from 'react';
import RideService from '../services/RideService';

const RideList = () => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await RideService.getRides();
            setRides(response.data);
        } catch (error) {
            console.error("Error fetching rides:", error);
        }
    };

    return (
        <div>
            <h2>Available Rides</h2>
            <ul>
                {rides.map(ride => (
                    <li key={ride.id}>
                        {ride.driver_name} - {ride.origin} to {ride.destination} at {new Date(ride.departure_time).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RideList;