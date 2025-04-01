import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MapComponent from '../User/MapComponent';
import Login from '../Login/Login';
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

    const isLoggedIn = true; // Simulate logged-in state or replace with real check
    // Scroll to top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            setIsSubmitted(true);
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
                                <div className="flex-1">
                                    <label className="block tc2" htmlFor="time">Time</label>
                                    <input
                                        className="w-full border-gray-300 rounded-lg p-2 fc"
                                        id="time"
                                        type="time"
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
