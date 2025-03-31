import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userDetails, setUser] = useState({
        Username: '',
        email: '',
        mobileNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const uid = localStorage.getItem("id");
        const storedUsername = localStorage.getItem("username");
        setUser(prevDetails => ({
            ...prevDetails,
            Username: storedUsername || ''
        }));

        const fetchUserData = async () => {
            const response = await fetch(`http://GoRide.ap-south-1.elasticbeanstalk.com/api/user/${uid}`);
            if (response.ok) {
                const data = await response.json();
                setUser(prevDetails => ({
                    ...prevDetails,
                    email: data.email,
                    mobileNumber: data.mobileNumber,
                }));
            } else {
                alert('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const uid = localStorage.getItem("id");

        try {
            const response = await fetch(`http://GoRide.ap-south-1.elasticbeanstalk.com/api/user/${uid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: uid,
                    Username: userDetails.Username,
                    Email: userDetails.email,
                    MobileNumber: userDetails.mobileNumber,
                }),
            });

            if (response.ok) {
                alert('User details updated successfully');
                setIsEditing(false); // Exit editing mode
            } else {
                alert('Failed to update user details');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Failed to update user details');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <UserNavbar />
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Your Profile</h2>

                    {/* Form to Edit User Details */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="Username"
                                    type="text"
                                    required
                                    value={userDetails.Username}
                                    onChange={handleInputChange}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your username"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={userDetails.email}
                                    onChange={handleInputChange}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="text"
                                    value={userDetails.mobileNumber}
                                    onChange={handleInputChange}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your mobile number"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Edit and Save buttons */}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>

                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;