import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import "./UserProfile.css"

const UserProfile = () => {
    const navigate = useNavigate();
    const [userDetails, setUser] = useState({
        Username: localStorage.getItem("username"),
        email: localStorage.getItem("email") ,
        mobileNumber: localStorage.getItem("phone")
    });
    const [isEditing, setIsEditing] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
    };

    return (
        <div className="flex flex-col bgcp sz">
            <UserNavbar />
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                <div className="bgcp2 py-8 px-4 shadow sm:rounded-lg sm:px-10 sz2">
                    <h2 className="text-2xl font-bold tcp mb-6 text-center">Your Profile</h2>

                    {/* Form to Edit User Details */}
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium tcp2">
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
                                    className="rounded-md relative block w-full px-3 py-2 tcp6 bgcp2 bp sm:text-sm"
                                    placeholder="Enter your username"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium tcp2">
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
                                    className="rounded-md relative block w-full px-3 py-2 tcp6 bgcp2 bp sm:text-sm"
                                    placeholder="Enter your email address"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium tcp2">
                                Mobile Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="text"
                                    value={userDetails.mobileNumber}
                                    onChange={handleInputChange}
                                    className="rounded-md relative block w-full px-3 py-2 tcp6 bgcp2 bp sm:text-sm"
                                    placeholder="Enter your mobile number"
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;