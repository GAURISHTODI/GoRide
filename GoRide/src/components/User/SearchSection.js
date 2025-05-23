import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import PaymentComponent from '../Payments/PaymentComponent';
import MapComponent from '../User/MapComponent';
import { collection, getDocs, query, where, updateDoc ,Timestamp, addDoc,doc} from 'firebase/firestore';
import { db } from '../firebase';
import "./SearchSection.css"
// Query Firestore
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

    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);


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
    const fetchAvailableTrips = async () => {
        try {
            const id = localStorage.getItem("id");
            if (!id) {
                alert("Please login/signup before you proceed!");
                return;
            }
            console.log(date.toString());
            const [year, month, day] = date.split("-");
            console.log(year + " " + month + " " + day);
            const startOfDay = Timestamp.fromDate(new Date(parseInt(year), parseInt(month), parseInt(day), 0, 0, 0));
            const endOfDay = Timestamp.fromDate(new Date(parseInt(year), parseInt(month), parseInt(day), 23, 59, 59));
            const normalizedFrom = from.toLowerCase().trim();
            console.log(normalizedFrom);
            const normalizedTo = to.toLowerCase().trim();
            console.log(normalizedTo);
            console.log(startOfDay.toString() + " " + endOfDay.toString());
            const q = query(
                collection(db, "requests"),
                where("date", "==", date.toString()),
                where("dest", "==", normalizedTo),
                where("start", "==", normalizedFrom),
                where("uid", "!=", id)
            );
            const querySnapshot = await getDocs(q);
            const filteredTrips = []
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                console.log(data.name);
                filteredTrips.push(doc.data());
            });
            console.log(filteredTrips.length == 0);
            setAvailableTrips(filteredTrips);
        } catch (error) {
            console.error("Error fetching trips from Firebase:", error);
        }
    };
    function compareSelectedKeys(obj1, obj2) {
        const keys = ['start', 'dest', 'date', 'time', 'uid'];
        return keys.every(key => obj1[key] === obj2[key]);
    }

    const handleJoin = async (trip) => {
        console.log("Hello!");
        const id = localStorage.getItem("id");
        if (!id) {
            alert("Please login/signup before you proceed!");
            return;
        }
        if (trip.curr_person >= trip.max_person) {
            alert("The trip is already full");
            return;
        }
        setIsJoining(true);
        trip.pid = id;
        try {
            const requestsRef = collection(db, "requests");
            const querySnapshot1 = await getDocs(requestsRef);
            querySnapshot1.forEach((docSnap) => {
                try {
                    const data = docSnap.data();
    
                    if (compareSelectedKeys(data, trip)) {
                        const updatedCount = (parseInt(data.curr_person) || 0) + 1;
                        const docRef = doc(db, "requests", docSnap.id);
                        updateDoc(docRef, { curr_person: updatedCount.toString() })
                            .then(() => console.log(`Updated curr_person for ${docSnap.id}: ${updatedCount}`))
                            .catch((error) => console.error("Error updating document:", error));
                    }
                } catch (innerError) {
                  console.error("Error in forEach loop:", innerError.message);
                }
              });
              alert(`The trip has been added`);
              console.log("Adding to passengers collection", trip);
              await addDoc(collection(db, "passangers"), trip); 
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
            //await fetchRides();

            // Fetch available trips from Firebase
            await fetchAvailableTrips();

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error:', error.message || 'Error processing request');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookNow = (ride) => {
        setSelectedRide(ride);
    };

    return (
        <>
            <UserNavbar />
            <section id="Search" className="py-10 bgch h-auto">
                <div className="container mx-auto px-4">
                    <div className="bgch2 shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 tch">Search for a ride</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block tch2" htmlFor="from">From</label>
                                    <input
                                        ref={fromInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2 pc"
                                        id="from"
                                        placeholder="City or address"
                                        type="text"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        style={{
                                            backgroundColor: "#1f1f1f",
                                            color: `${isFocused ? "#f0ecfc" : "#9e7aff"}`,
                                            border: `2px solid ${isFocused ? "#9e7aff" : "#534a6a"}`,
                                            padding: "8px",
                                            borderRadius: "5px",
                                            width: "100%",
                                            outline: "none", // Removes default browser outline
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block tch2" htmlFor="to">To</label>
                                    <input
                                        ref={toInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2 pc"
                                        id="to"
                                        placeholder="City or address"
                                        type="text"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        onFocus={() => setIsFocused2(true)}
                                        onBlur={() => setIsFocused2(false)}
                                        style={{
                                            backgroundColor: "#1f1f1f",
                                            color: `${isFocused2 ? "#f0ecfc" : "#9e7aff"}`,
                                            border: `2px solid ${isFocused2 ? "#9e7aff" : "#534a6a"}`,
                                            padding: "8px",
                                            borderRadius: "5px",
                                            width: "100%",
                                            outline: "none", // Removes default browser outline
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block tch2" htmlFor="date">Date</label>
                                    <input
                                        className="w-full border-gray-300 rounded-lg p-2"
                                        id="date"
                                        type="date"
                                        min={currentDate}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        onFocus={() => setIsFocused3(true)}
                                        onBlur={() => setIsFocused3(false)}
                                        style={{
                                            backgroundColor: "#1f1f1f",
                                            color: `${isFocused3 ? "#9e7aff" : "#8164d0"}`,
                                            border: `2px solid ${isFocused3 ? "#9e7aff" : "#534a6a"}`,
                                            padding: "8px",
                                            borderRadius: "5px",
                                            width: "100%",
                                            outline: "none", // Removes default browser outline
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full  rounded-lg p-2 bgch3 pbh"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Calculating...' : 'Search'}
                            </button>
                        </form>

                        {distanceInfo && (
                            <div className="mt-4 p-3 bgch4 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2 tch">Trip Details</h3>
                                <p className="tch3">Distance: {distanceInfo.distance}</p>
                                <p className="tch3">Estimated Travel Time: {distanceInfo.duration}</p>
                            </div>
                        )}
                        {isSubmitted && from && to && (
                            <div className="mt-10">
                                <MapComponent from={from} to={to} setDistance={setDistanceInfo} />
                            </div>
                        )}

                        {/* Display available trips (new component) */}
                        {isSubmitted && (
                            <div className="mt-10">
                                <h3 className="text-xl font-bold mb-4 tch">Available Trips</h3>

                                {availableTrips.length > 0 ? (
                                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bgch4 p-4 rounded">
                                        {availableTrips.map((trip) => (
                                            <div className="rounded-lg shadow-md p-4 bgch5 transition-shadow">
                                                <div className="mb-4">
                                                    <h4 className="text-lg font-semibold tch">{trip.name || 'Anonymous User'}</h4>
                                                    <div className="flex items-center text-gray-600 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="#c9b8fa">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <span className='tch4'>{trip.phone || 'Phone number not available'}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">From:</span>
                                                        <span className="tch5">{trip.start}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">To:</span>
                                                        <span className="tch5">{trip.dest}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">Max Capacity</span>
                                                        <span className="tch5">{trip.max_person}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">Current Capacity</span>
                                                        <span className="tch5">{trip.curr_person}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">Date:</span>
                                                        <span className="tch5">{(trip.date).toString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="w-24 font-medium tch5">Time:</span>
                                                        <span className="tch5">{(trip.time).toString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    className="mt-4 w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"

                                                    onClick={() => handleJoin(trip)}
                                                >
                                                    {isJoining ? 'Joining...' : 'Join'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bgch4 rounded-lg p-6 text-center">
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
                    {/* {selectedRide && (
                        <div className="mt-6">
                            <PaymentComponent
                                amount={selectedRide.price}
                                rideId={selectedRide.id}
                                userId={userId}
                            />
                        </div>
                    )} */}
                </div>
            </section>
        </>
    );
};

export default SearchSection;