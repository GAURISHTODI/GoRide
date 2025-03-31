import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import PaymentComponent from '../Payments/PaymentComponent';

const SearchSection = ({ setSearchQuery, setDistance }) => {
    const navigate = useNavigate();
    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rides, setRides] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [distanceInfo, setDistanceInfo] = useState(null);
    const [selectedRide, setSelectedRide] = useState(null); // To store selected ride
     
        const [upcomingRides, setUpcomingRides] = useState([]);
        const [userId, setUserId] = useState(null);
        const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
        const [rideBookings, setRideBookings] = useState({});

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
        const uid = localStorage.getItem("id");
                if (uid) {
                    setUserId(uid);
                    setIsUserLoggedIn(true);
                } else {
                    setIsUserLoggedIn(false);
                }

        const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current, {
            types: ['geocode'],
        });

        const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current, {
            types: ['geocode'],
        });
        
        fromAutocomplete.addListener('place_changed', () => {
            const place = fromAutocomplete.getPlace();
            if (place && place.geometry) {
                setFrom(place.formatted_address);
            }
        });

        toAutocomplete.addListener('place_changed', () => {
            const place = toAutocomplete.getPlace();
            if (place && place.geometry) {
                setTo(place.formatted_address);
            }
        });
       
        
        return () => {
            if (fromInputRef.current) {
                window.google.maps.event.clearInstanceListeners(fromInputRef.current);
            }
            if (toInputRef.current) {
                window.google.maps.event.clearInstanceListeners(toInputRef.current);
            }
        };
    }, []);

    const getDistance = (from, to) => {
        return new Promise((resolve, reject) => {
            const service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [from],
                    destinations: [to],
                    travelMode: google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === google.maps.DistanceMatrixStatus.OK) {
                        const distance = response.rows[0].elements[0].distance.text;
                        resolve(distance);
                    } else {
                        reject('Error fetching distance');
                    }
                }
            );
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDistanceInfo(null); // Reset distance info on new search

        try {
            const distance = await getDistance(from, to);
            setDistanceInfo(distance);
            setSearchQuery({ from, to });

            const response = await axios.get('http://GoRide.ap-south-1.elasticbeanstalk.com/api/rides/filter', {
                params: { from, to, date }
            });
            setRides(response.data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleBookNow = (ride) => {
        setSelectedRide(ride);
    };

    const handlePaymentSuccess = (rideId) => {
        setRideBookings(prevBookings => ({
            ...prevBookings,
            [rideId]: (prevBookings[rideId] || 0) + 1
        }));
        fetchRides();
    };

    

    return (
        <>
            <UserNavbar />
            <section id="Search" className="py-10">
                <div className="container mx-auto px-4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Search for a ride</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700" htmlFor="from">From</label>
                                    <input
                                        ref={fromInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2"
                                        id="from"
                                        placeholder="City or address"
                                        type="text"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700" htmlFor="to">To</label>
                                    <input
                                        ref={toInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2"
                                        id="to"
                                        placeholder="City or address"
                                        type="text"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700" htmlFor="date">Date</label>
                                    <input
                                        className="w-full border-gray-300 rounded-lg p-2"
                                        id="date"
                                        type="date"
                                        min={currentDate}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                        </form>

                        {/* Display distance info */}
                        {distanceInfo && (
                            <div className="mt-2">
                                <p className="text-gray-700">Distance: {distanceInfo}</p>
                            </div>
                        )}

                        {/* Display filtered rides */}
                        {rides.length > 0 && (
                            <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                <h3 className="text-xl font-semibold mb-4">Available Rides</h3>
                                {rides.map((ride, index) => {
                                    const [from, to] = ride.route.split(" to "); // Split the route string into 'from' and 'to'
                                    return (
                                        <div key={index} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105">
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">{ride.driverName} - {from} to {to}</h3>
                                                <p className="text-sm text-gray-600">Date: {ride.date}</p>
                                                <p className="text-sm text-gray-600">Price: ₹{ride.price}</p>
                                                <p className="text-sm text-gray-600">Remaining Seats: {ride.remainingPassengers}</p>
                                            </div>
                                            <button
                                    className={`mt-4 py-2 px-4 rounded-xl text-white ${ride.remainingPassengers > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                    onClick={() => handleBookNow(ride)}
                                    disabled={ride.remainingPassengers <= 0}
                                >
                                    {ride.remainingPassengers > 0 ? 'Book Now' : 'No Seats Left'}
                                </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {selectedRide && (
                    <PaymentComponent
                        amount={selectedRide.price}
                        rideId={selectedRide.id}
                        userId={userId}
                        onPaymentSuccess={() => handlePaymentSuccess(selectedRide.id)}
                    />
                )}
                </div>
            </section>
        </>
    );
};

export default SearchSection;
