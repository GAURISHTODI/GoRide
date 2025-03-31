// src/pages/Safety.js
import React from 'react';
import Navbar from './NavBar'; // Importing the Navbar component
import { FaShieldAlt, FaPhoneAlt, FaUser ,Check, FaComments, FaMapMarkerAlt } from 'react-icons/fa'; // Correct import for icons

const Safety = () => {
    return (
        <>
            <Navbar /> {/* Include the Navbar here */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-6 text-white text-center animate__animated animate__fadeIn" aria-label="Your Safety is Our Priority">Your Safety is Our Priority</h1>
                    <p className="mb-6 text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
                        At [Your GoRide Company], we prioritize your safety above all else. Here are the measures we take to ensure a secure and comfortable ride for you:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '0.4s' }}>
                            <FaUser Check className="text-blue-600 text-4xl mb-2" />
                            <h2 className="text-2xl font-semibold mb-2 text-blue-600">1. Background Checks</h2>
                            <p>
                                All our drivers undergo thorough background checks, including criminal history and driving record evaluations, to ensure they meet our safety standards.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '0.6s' }}>
                            <FaMapMarkerAlt className="text-blue-600 text-4xl mb-2" />
                            <h2 className="text-2xl font-semibold mb-2 text-blue-600">2. In-App Safety Features</h2>
                            <p>
                                Our app includes features such as:
                                <ul className="list-disc list-inside ml-4">
                                    <li>Real-time GPS tracking of your ride</li>
                                    <li>Share your ride details with friends or family</li>
                                    <li>Emergency contact button for immediate assistance</li>
                                </ul>
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '0.8s' }}>
                            <FaShieldAlt className="text-blue-600 text-4xl mb-2" />
                            <h2 className="text-2xl font-semibold mb-2 text-blue-600">3. Driver Training</h2>
                            <p>
                                Our drivers are trained to provide a safe and comfortable experience. They are educated on customer service, conflict resolution, and emergency procedures.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '1s' }}>
                            <FaPhoneAlt className="text-blue-600 text-4xl mb-2" />
                            <h2 className="text-2xl font-semibold mb-2 text-blue-600">4. Customer Support</h2>
                            <p>
                                Our dedicated customer support team is available 24/7 to assist you with any concerns or issues you may encounter during your ride.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '1.2s' }}>
                            <FaComments className="text-blue-600 text-4xl mb-2" />
                            <h2 className="text-2xl font-semibold mb-2 text-blue-600">5. Feedback and Ratings</h2>
                            <p>
                                We encourage our riders to provide feedback and rate their drivers after each trip. This helps us maintain high standards and address any issues promptly.
                            </p>
                        </div>
                    </div>
                    <p className="text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '1.4s' }}>
                        Your safety is our top priority, and we are committed to providing you with a secure GoRide experience. If you have any questions or concerns, please feel free to contact our support team.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Safety;