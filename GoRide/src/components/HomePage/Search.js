import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapComponent from '../User/MapComponent';
import UserNavbar from './NavBar';
import "./Search.css"

const Search = ({ setDistance }) => {
    const navigate = useNavigate();
    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [distanceInfo, setDistanceInfo] = useState(null); // State for distance and duration
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = true; // Simulate logged-in state or replace with real check
    
    // Scroll to top when the component is mounted
    // Scroll to top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
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

    // Function to calculate distance between two points
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        
        setIsLoading(true);
        
        try {
            if (!from || !to) {
                throw new Error('Please enter both starting and destination locations');
                return;
            }
            
            const distanceData = await getDistance(from, to);
            setDistanceInfo(distanceData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error:', error.message || 'Error calculating distance');
            // You might want to show an error message to the user here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        <section id="Search" className="py-10">
                <div className="container mx-auto px-4">
                    <div className="bgd2 shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 tc">Search for a ride</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block tc2" htmlFor="from">From</label>
                                    <input
                                        ref={fromInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2 fc"
                                        id="from"
                                        placeholder="City or address"
                                        type="text"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block tc2" htmlFor="to">To</label>
                                    <input
                                        ref={toInputRef}
                                        className="w-full border-gray-300 rounded-lg p-2 fc"
                                        id="to"
                                        placeholder="City or address"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block tc2" htmlFor="date">Date</label>
                                    <input
                                        className="w-full border-gray-300 rounded-lg p-2 fc"
                                        id="date"
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}  // Set min to the current date
                                    />
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="w-full text-black rounded-lg p-2"
                            >
                                <Link
                                    to="/login"
                                    className="w-full tcb rounded-lg p-2 text-center block"
                                >
                                    Search
                                </Link>

                            </button>
                        </form>

                        {/* Map Component */}
                        {isSubmitted && from && to && (
                            <div className="mt-10">
                                <MapComponent from={from} to={to} setDistance={setDistanceInfo} />
                            </div>
                        )}

                        {/* Display distance and time */}
                        {distanceInfo && (
                            <div className="mt-4 text-lg text-gray-700">
                                <p>Distance: {distanceInfo.distance}</p>
                                <p>Duration: {distanceInfo.duration}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    );
};

export default Search;




