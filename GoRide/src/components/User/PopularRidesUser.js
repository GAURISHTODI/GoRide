import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentComponent from '../Payments/PaymentComponent';
import UserNavbar from './UserNavbar';

const PopularRidesUser = () => {
    const [selectedRide, setSelectedRide] = useState(null);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track if the user is logged in

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://GoRide.ap-south-1.elasticbeanstalk.com/api/Rides');
                console.log("Rides data from API:", response.data);  // Log raw API response data
                const currentDate = new Date();
                const filteredRides = response.data.filter(ride => new Date(ride.date) > currentDate);
                setUpcomingRides(filteredRides);
                console.log("Filtered Rides:", filteredRides);  // Log filtered rides after filtering by date
            } catch (error) {
                console.error('Error fetching rides:', error);
            }
        };
        fetchRides();
    }, [isUserLoggedIn]);

    useEffect(() => {
        if (selectedRide) {
            console.log("Selected Ride:", selectedRide); // This will log after selecting a ride
        }
    }, [selectedRide]);

    const handleBookNow = (ride) => {
        setSelectedRide(ride);  // Set selected ride when user clicks "Book Now"
    };

    return (
        <>
            <UserNavbar />
            <div className="container">
                <h2 className="text-2xl font-bold">Upcoming Rides</h2>
                <div className="rides-grid">
                    {upcomingRides.length > 0 ? (
                        upcomingRides.map((ride, index) => (
                            <div key={index} className="card">
                                <h3 className="font-bold">{ride.route}</h3>
                                <p>Date: {ride.date}</p>
                                <p>Driver: {ride.driver}</p>
                                <p>Price: ₹{ride.price.toFixed(2)}</p>
                                <p>Rating: {ride.rating}</p>
                                <p>Ride ID: {ride.id}</p>  {/* Display Ride ID */}
                                <button className="book-now-button" onClick={() => handleBookNow(ride)}>Book Now</button>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming rides available.</p>
                    )}
                </div>
                {selectedRide && (
                    <PaymentComponent 
                        amount={selectedRide.price} 
                        rideId={selectedRide.id}  // Ensure rideId is passed correctly
                    />
                )}
            </div>
        </>
    );
};

export default PopularRidesUser;
