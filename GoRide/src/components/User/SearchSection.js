import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import PaymentComponent from '../Payments/PaymentComponent';
import MapComponent from '../User/MapComponent';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path to your Firebase config


// Sample trip data for testing
const sampleTrips = [
    {
      id: "trip1",
      username: "Rahul Sharma",
      phoneNumber: "+91 9876543210",
      userId: "user123",
      from: "Kota, Rajasthan, India",
      to: "Delhi, India",
      date: "2025-04-05",
      time: "18:00",
      seats: 3,
      price: 850,
      vehicleType: "Sedan",
      additionalInfo: "Traveling with light luggage only"
    },
    {
      id: "trip2",
      username: "Priya Patel",
      phoneNumber: "+91 8765432109",
      userId: "user456",
      from: "Kota",
      to: "Delhi",
      date: "2025-04-05", 
      time: "18:00",
      seats: 2,
      price: 900,
      vehicleType: "SUV",
      additionalInfo: "AC vehicle, space for medium luggage"
    },
    {
      id: "trip3",
      username: "Amit Kumar",
      phoneNumber: "+91 7654321098",
      userId: "user789",
      from: "Kota",
      to: "Delhi",
      date: "2025-04-05",
      time: "18:30",
      seats: 1,
      price: 800,
      vehicleType: "Hatchback",
      additionalInfo: "Non-smoking vehicle"
    }
  ]

const SearchSection = ({ setSearchQuery, setDistance }) => {
    const navigate = useNavigate();
    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rides, setRides] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [distanceInfo, setDistanceInfo] = useState(null);
    const [selectedRide, setSelectedRide] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [upcomingRides, setUpcomingRides] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [rideBookings, setRideBookings] = useState({});
    const [availableTrips, setAvailableTrips] = useState([]);
    const [isJoining, setIsJoining] = useState(false);

    // Scroll to top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

        // Make sure Google Maps API is loaded
        if (!window.google || !window.google.maps || !window.google.maps.places) {
            console.error('Google Maps API not loaded');
            return;
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
            // Make sure google.maps is available
            if (!window.google || !window.google.maps) {
                reject('Google Maps API not loaded');
                return;
            }
            
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [from],
                    destinations: [to],
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    unitSystem: window.google.maps.UnitSystem.METRIC,
                },
                (response, status) => {
                    if (status === window.google.maps.DistanceMatrixStatus.OK) {
                        if (response.rows[0].elements[0].status === 'OK') {
                            const distanceText = response.rows[0].elements[0].distance.text;
                            const distanceValue = response.rows[0].elements[0].distance.value; // in meters
                            const durationText = response.rows[0].elements[0].duration.text;
                            
                            // If setDistance prop exists, pass the value
                            if (setDistance) {
                                setDistance(distanceValue / 1000); // Convert to kilometers
                            }
                            
                            resolve({
                                distance: distanceText,
                                duration: durationText,
                                distanceValue: distanceValue
                            });
                        } else {
                            reject('No route found between these locations');
                        }
                    } else {
                        reject(`Error fetching distance: ${status}`);
                    }
                }
            );
        });
    };

    const fetchRides = async () => {
        try {
            const response = await axios.get('http://rideshare.ap-south-1.elasticbeanstalk.com/api/rides/filter', {
                params: { from, to, date }
            });
            setRides(response.data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // New function to fetch available trips from Firebase
    // const fetchAvailableTrips = async () => {
    //     try {
    //         // Normalize the inputs for better matching
    //         const normalizedFrom = from.toLowerCase().trim();
    //         const normalizedTo = to.toLowerCase().trim();
            
    //         // Query Firestore for trips that match the criteria
    //         const tripsRef = collection(db, "trips");
            
    //         // You might need to adjust the query based on your Firebase structure
    //         const q = query(
    //             tripsRef,
    //             where("from", "==", normalizedFrom),
    //             where("to", "==", normalizedTo),
    //             where("date", "==", date),
    //             where("time", "==", time)
    //         );
            
    //         const querySnapshot = await getDocs(q);
            
    //         const trips = [];
    //         querySnapshot.forEach((doc) => {
    //             // Filter out the user's own trips
    //             const tripData = doc.data();
    //             if (tripData.userId !== userId) {
    //                 trips.push({
    //                     id: doc.id,
    //                     ...tripData
    //                 });
    //             }
    //         });
            
    //         setAvailableTrips(trips);
    //     } catch (error) {
    //         console.error("Error fetching trips from Firebase:", error);
    //     }
    // };

    // For testing: Use sample data instead of Firebase query
const fetchAvailableTrips = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter the sample data based on search criteria
      const filteredTrips = sampleTrips.filter(trip => 
        trip.from.toLowerCase() === from.toLowerCase() &&
        trip.to.toLowerCase() === to.toLowerCase() &&
        trip.date === date &&
        // Optional: Check if time is close to searched time (within 30 min)
        Math.abs(parseInt(trip.time.split(':')[0]) - parseInt(time.split(':')[0])) <= 1
      );
      
      setAvailableTrips(filteredTrips);
    } catch (error) {
      console.error("Error fetching sample trips:", error);
      setAvailableTrips([]);
    }
  };

    const handleJoinTrip = async (tripId) => {
        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }
        
        setIsJoining(true);
        try {
            // Here you would implement the logic to join the trip
            // This could involve updating the trip document in Firebase
            // For example, adding the user's ID to an array of participants
            
            // For demonstration purposes, we'll just show an alert
            alert(`Successfully joined trip ${tripId}`);
            
            // Refresh the list of available trips
            await fetchAvailableTrips();
        } catch (error) {
            console.error("Error joining trip:", error);
            alert("Failed to join trip. Please try again.");
        } finally {
            setIsJoining(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isUserLoggedIn) {
            navigate('/login');
            return;
        }
        
        setIsLoading(true);
        setDistanceInfo(null); // Reset distance info on new search
    
        try {
            if (!from || !to) {
                throw new Error('Please enter both starting and destination locations');
            }
    
            const distanceData = await getDistance(from, to);
            setDistanceInfo(distanceData);
            
            // Update search query state if the prop exists
            if (setSearchQuery) {
                setSearchQuery({ from, to, date, time });
            }
    
            // Fetch available rides from the API
            await fetchRides();
            
            // Fetch available trips from Firebase
            await fetchAvailableTrips();
            
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error:', error.message || 'Error processing request');
            // You might want to show an error message to the user here
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
                                <div className="flex-1">
                                    <label className="block text-gray-700" htmlFor="time">Time</label>
                                    <input
                                        className="w-full border-gray-300 rounded-lg p-2"
                                        id="time"
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Calculating...' : 'Search'}
                            </button>
                        </form>

                        {/* Display distance info */}
                        {distanceInfo && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">Trip Details</h3>
                                <p className="text-gray-700">Distance: {distanceInfo.distance}</p>
                                <p className="text-gray-700">Estimated Travel Time: {distanceInfo.duration}</p>
                            </div>
                        )}

                        {/* Map Component */}
                        {isSubmitted && from && to && (
                            <div className="mt-10">
                                <MapComponent from={from} to={to} setDistance={setDistanceInfo} />
                            </div>
                        )}

                        {/* Display available trips (new component) */}
                        {isSubmitted && (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4">Available Trips</h3>
                                
                                {availableTrips.length > 0 ? (
                                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                        {availableTrips.map((trip) => (
                                            <div key={trip.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                                                <div className="mb-4">
                                                    <h4 className="text-lg font-semibold">{trip.username || 'Anonymous User'}</h4>
                                                    <div className="flex items-center text-gray-600 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <span>{trip.phoneNumber || 'Phone number not available'}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium">From:</span>
                                                        <span className="text-gray-700">{trip.from}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium">To:</span>
                                                        <span className="text-gray-700">{trip.to}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium">Date:</span>
                                                        <span className="text-gray-700">{trip.date}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium">Time:</span>
                                                        <span className="text-gray-700">{trip.time}</span>
                                                    </div>
                                                </div>
                                                
                                                <button
                                                    className="mt-4 w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                    onClick={() => handleJoinTrip(trip.id)}
                                                    disabled={isJoining}
                                                >
                                                    {isJoining ? 'Joining...' : 'Join'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                                        <p className="text-gray-600">No trips available matching your criteria.</p>
                                        <p className="text-gray-500 text-sm mt-2">Try different locations or dates to find available trips.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Display filtered rides */}
                        {rides.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold mb-4">Available Rides</h3>
                                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {rides.map((ride, index) => {
                                        const [rideFrom, rideTo] = ride.route ? ride.route.split(" to ") : ["", ""];
                                        return (
                                            <div key={index} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between transition-transform transform hover:scale-105">
                                                <div>
                                                    <h3 className="font-bold text-lg mb-2">{ride.driverName} - {rideFrom} to {rideTo}</h3>
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
                            </div>
                        )}
                    </div>
                    
                    {/* Payment Component */}
                    {selectedRide && (
                        <div className="mt-6">
                            <PaymentComponent
                                amount={selectedRide.price}
                                rideId={selectedRide.id}
                                userId={userId}
                                onPaymentSuccess={() => handlePaymentSuccess(selectedRide.id)}
                            />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default SearchSection;