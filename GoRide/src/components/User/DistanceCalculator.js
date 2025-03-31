// src/components/DistanceCalculator.js
import React, { useState } from 'react';
import MapComponent from './MapComponent';

const DistanceCalculator = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);

    const calculateDistance = () => {
        const directionsService = new window.google.maps.DirectionsService();

        const request = {
            origin: from,
            destination: to,
            travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
                const distanceInMeters = result.routes[0].legs[0].distance.value;
                setDistance(distanceInMeters);
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateDistance();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <button type="submit">Calculate Distance</button>
            </form>
            {distance && <p>Distance: {distance} meters</p>}
            <MapComponent directions={directions} />
        </div>
    );
};

export default DistanceCalculator;