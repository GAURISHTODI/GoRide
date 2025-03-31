import React, { useState } from 'react';
import RideService from '../services/RideService';

const OfferRide = () => {
    const [driverName, setDriverName] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [seatsAvailable, setSeatsAvailable] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RideService.offerRide({ driver_name: driverName, origin, destination, departure_time: departureTime, seats_available: seatsAvailable });
            // Reset form
            setDriverName('');
            setOrigin('');
            setDestination('');
            setDepartureTime('');
            setSeatsAvailable(1);
        } catch (error) {
            console.error("Error offering ride:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Offer a Ride</h2>
            <input type="text" placeholder="Driver Name" value={driverName} onChange={(e) => setDriverName(e.target.value)} required />
            <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            <input type="datetime-local" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
            <input type="number" value={seatsAvailable} onChange={(e) => setSeatsAvailable(e.target.value)} min="1" required />
            <button type="submit">Offer Ride</button>
        </form>
    );
};

export default OfferRide;