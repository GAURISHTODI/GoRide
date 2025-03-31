import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // For navigation

    // Extract email from the query string in the URL
    const email = new URLSearchParams(location.search).get('email');

    // Make sure email exists, otherwise redirect the user
    useEffect(() => {
        if (!email) {
            setModalMessage('Invalid or expired link. Please try again.');
            setModalVisible(true);
            setTimeout(() => {
                navigate('/forgot-password'); // Redirect to Forgot Password if email is invalid
            }, 3000);
        }
    }, [email, navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await fetch('http://GoRide.ap-south-1.elasticbeanstalk.com/api/UpdatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }), // Sending email and new password
            });
    
            const data = await response.json();
            
            console.log('Response from backend:', data);  // Log the response data
    
            if (response.ok) {
                setModalMessage('Password successfully updated.');
                setModalVisible(true);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after successful password change
                }, 1000);
            } else {
                setModalMessage(data.error || 'An error occurred while updating the password.');
                setModalVisible(true);
            }
        } catch (err) {
            console.error('Error occurred:', err);  // Log any errors
            setModalMessage('An error occurred. Please try again later.');
            setModalVisible(true);
        }
    };
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Update Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal Popup */}
            {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center w-80">
                        <h1 className="text-xl font-bold text-green-600">{modalMessage}</h1>
                        <button
                            onClick={() => setModalVisible(false)}
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

export default UpdatePassword;