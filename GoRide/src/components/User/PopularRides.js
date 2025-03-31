import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentComponent from '../Payments/PaymentComponent';
import RidesNavBar from '../HomePage/RidesNavBar';


const PopularRides = () => {
    const [selectedRide, setSelectedRide] = useState(null);
    const [rides, setRides] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBookNow = (ride) => {
        setSelectedRide(ride);
    };

    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
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

    return (
        <>
            <RidesNavBar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Search For Ride</h2>
                <form onSubmit={handleFilterSubmit} className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">From</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg p-2"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                placeholder="City or address"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">To</label>
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-lg p-2"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="City or address"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">Date</label>
                            <input
                                type="date"
                                className="w-full border-gray-300 rounded-lg p-2"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600"
                    >
                        Search Rides
                    </button>
                </form>

                {isLoading ? (
                    <p className="mt-4">Loading rides...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {rides.length > 0 ? (
                            rides.map((ride, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="font-bold text-lg mb-2">{ride.route}</h3>
                                    <p className="text-gray-700 mb-2">Date: {ride.date}</p>
                                    <p className="text-gray-700 mb-2">Driver: {ride.driver}</p>
                                    <p className="text-gray-700 mb-2">Price: ₹{ride.price}</p>
                                    <p className="text-gray-700 mb-4">Rating: {ride.rating}</p>
                                    <button
                                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                                        onClick={() => handleBookNow(ride)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No rides found for the selected filters.</p>
                        )}
                    </div>
                )}

                {selectedRide && (
                    <PaymentComponent amount={selectedRide.price} />
                )}
            </div>
        </>
    );
};

export default PopularRides;
