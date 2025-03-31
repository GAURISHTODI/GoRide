// src/components/UpcomingRides.js
import React from 'react';

const upcomingRides = [
    { driver: "Shanu", driverImage: "https://storage.googleapis.com/a1aa/image/ImxifoeQiAuc9UQR8c7JdbMQ7tOWJ1Cc2rqVjgDHbH4EFG3TA.jpg", source: "IET", destination: "SWARGATE", time: "10:00 AM", pickupPoint: "IET Main Gate" },
    { driver: "Hrishi Bhai", driverImage: "https://storage.googleapis.com/a1aa/image/ImxifoeQiAuc9UQR8c7JdbMQ7tOWJ1Cc2rqVjgDHbH4EFG3TA.jpg", source: "IET", destination: "PIMPRI", time: "11:30 AM", pickupPoint: "IET Parking Lot" },
    { driver: "Sunny Bhai", driverImage: "https://storage.googleapis.com/a1aa/image/ImxifoeQiAuc9UQR8c7JdbMQ7tOWJ1Cc2rqVjgDHbH4EFG3TA.jpg", source: "IET", destination: "CHINCHWAD", time: "1:00 PM", pickupPoint: "IET Bus Stop" },
    
];

const UpcomingRides = () => {
    return (
        <section id="UpcomingRides" className="py-10 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Rides</h2>
                <div className="grid grid-cols-1 gap-6">
                    {upcomingRides.map((ride, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-3 flex items-center justify-center max-w-md mx-auto">
                            <img alt="Profile picture of the driver" className="w-12 h-12 rounded-full mr-3" src={ride.driverImage} />
                            <div className="flex-grow text-center">
                                <h3 className="text-lg font-semibold">{ride.driver}</h3>
                                <p className="text-gray-700"><i className="fas fa-map-marker-alt text-blue-600"></i> {ride.source} to {ride.destination}</p>
                                <p className="text-gray-700"><i className="fas fa-clock text-blue-600"></i> {ride.time}</p>
                                <p className="text-gray-700"><i className="fas fa-map-marker-alt text-blue-600"></i> Pickup: {ride.pickupPoint}</p>
                            </div>
                            <div className="flex justify-center">
                                <a className="bg-blue-600 text-white px-3 py-1 rounded" href="#">Book Now</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UpcomingRides;