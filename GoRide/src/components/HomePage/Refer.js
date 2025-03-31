// src/pages/Refer.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from './NavBar'; // Ensure this is your Navbar component
import { FaUser , FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa'; // Importing icons

const Refer = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleButtonClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-4 text-white text-center animate__animated animate__fadeIn" aria-label="Refer a Friend, Earn Rewards!">Refer a Friend, Earn Rewards!</h1>
                    <p className="mb-6 text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
                        At GoRide, we believe in sharing the love! Our referral program allows you to earn rewards by inviting your friends to join our GoRide community.
                    </p>
                    
                    <h2 className="text-3xl font-semibold mb-4 text-white text-center animate__animated animate__fadeIn" style={{ animationDelay: '0.4s' }} aria-label="How It Works">How It Works</h2>
                    <p className="mb-4 text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '0.6s' }}>
                        It's simple! Just follow these steps:
                    </p>
                    <ol className="list-decimal list-inside ml-4 mb-6 text-white text-lg animate__animated animate__fadeIn" style={{ animationDelay: '0.8s' }}>
                        <li>Share your unique referral link with friends and family.</li>
                        <li>When they sign up and take their first ride, you both earn rewards!</li>
                    </ol>

                    <h2 className="text-3xl font-semibold mb-4 text-white text-center animate__animated animate__fadeIn" style={{ animationDelay: '1s' }} aria-label="What You Earn">What You Earn</h2>
                    <p className="mb-4 text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '1.2s' }}>
                        For every friend you refer who completes their first ride, you will receive:
                    </p>
                    <ul className="list-disc list-inside ml-4 mb-6 text-white text-lg animate__animated animate__fadeIn" style={{ animationDelay: '1.4s' }}>
                        <li>A ₹100 credit towards your next ride</li>
                        <li>Your friend will also receive a ₹100 discount on their first ride!</li>
                    </ul>

                    <h2 className="text-3xl font-semibold mb-4 text-white text-center animate__animated animate__fadeIn" style={{ animationDelay: '1.6s' }} aria-label="Why Refer Us?">Why Refer Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '1.8s' }}>
                            <FaShieldAlt className="text-blue-600 text-4xl mb-2" />
                            <h3 className="font-semibold">Safety First</h3>
                            <p>High safety standards and background-checked drivers.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '2s' }}>
                            <FaUser  className="text-blue-600 text-4xl mb-2" />
                            <h3 className="font-semibold">User -Friendly</h3>
                            <p>User-friendly app with real-time tracking.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn transition-transform transform hover:scale-105 hover:shadow-xl" style={{ animationDelay: '2.2s' }}>
                            <FaMoneyBillWave className="text-blue-600 text-4xl mb-2" />
                            <h3 className="font-semibold">24/7 Support</h3>
                            <p>24/7 customer support for any inquiries.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold mb-4 text-white text-center animate__animated animate__fadeIn" style={{ animationDelay: '2.4s' }} aria-label="Get Started">Get Started</h2>
                    <p className="mb-4 text-center text-lg text-white animate__animated animate__fadeIn" style={{ animationDelay: '2.6s' }}>
                        Ready to start earning rewards? Click the button below to get your unique referral link!
                    </p>
                    <div className="text-center">
                        <button 
                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 animate__animated animate__fadeIn" 
                            style={{ animationDelay: '2.8s' }} 
                            onClick={handleButtonClick} // Add onClick event to handle redirection
                        >
                            Get My Referral Link
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Refer;