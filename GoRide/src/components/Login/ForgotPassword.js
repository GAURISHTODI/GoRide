import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate(); // For navigation

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate email format
        const emailRegex = /^(?:[a-zA-Z0-9._%+-]+)@(?:[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            setModalMessage('Please provide a valid email address.');
            setModalVisible(true);
            return;
        } else {
            setError('');
        }

        try {
            // Make a POST request to verify the email exists in the database
            const response = await fetch('https://localhost:44345/api/VerifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setModalMessage(data.message); // Success message from the backend
                setModalVisible(true);
                setTimeout(() => {
                    // Redirect to UpdatePassword page with the email as a query parameter
                    navigate(`/update-password?email=${email}`);
                }, 3000); // Redirect after 3 seconds
            } else {
                setModalMessage(data.error || 'Email not found. Please try again.');
                setModalVisible(true);
            }
        } catch (err) {
            setModalMessage('An error occurred. Please try again later.');
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#007BFF', color: 'white' }}>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="text-black">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-2"
                        >
                            Verify Email
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal Popup */}
            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center w-80">
                        <img
                            width="50px"
                            src="https://w7.pngwing.com/pngs/709/448/png-transparent-green-check-business-internet-service-organization-computer-software-web-page-green-registration-success-button-web-design-company-text-thumbnail.png"
                            alt="Success"
                            className="mx-auto mb-4"
                        />
                        <h1 className="text-xl font-bold text-green-600">{modalMessage}</h1>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
