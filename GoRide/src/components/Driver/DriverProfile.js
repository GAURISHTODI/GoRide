import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDriver from './NavBarDriver';

const DriverProfile = () => {
    const navigate = useNavigate();
    const [driverId, setDriverId] = useState(null);  // Store Driver ID
    const [driverDetails, setDriverDetails] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        carNumber: '',
        licenseNumber: '',
        cardLastFour: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const uid = localStorage.getItem("id"); // Fetch driver ID from localStorage
        setDriverId(uid);  // Store ID in state

        if (!uid) {
            alert("Driver ID not found!");
            return;
        }

        const fetchDriverData = async () => {
            try {
                const response = await fetch(`http://GoRide.ap-south-1.elasticbeanstalk.com/api/driver/${uid}`);
                if (response.ok) {
                    const data = await response.json();

                    setDriverDetails({
                        id:data.id,
                        name: data.name,
                        email: data.email,
                        mobileNumber: data.mobileNumber,
                        carNumber: data.carNumber,
                        licenseNumber: data.licenseNumber,
                        cardLastFour: data.cardLastFour,
                    });
                } else {
                    alert('Failed to fetch driver data');
                }
            } catch (error) {
                console.error("Error fetching driver data:", error);
            }
        };

        fetchDriverData();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDriverDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!driverId) {
            alert("Driver ID is missing! Cannot update.");
            return;
        }
    
        try {
            const response = await fetch(`http://GoRide.ap-south-1.elasticbeanstalk.com/api/driver/${driverId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(driverDetails),
            });
    
            if (response.ok) {
                alert('Driver details updated successfully');
                setIsEditing(false);
            } else {
                alert('Failed to update driver details');
            }
        } catch (error) {
            console.error('Error updating driver data:', error);
            alert('Failed to update driver details');
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="fixed top-0 left-0 w-full z-10 bg-white shadow">
                <NavbarDriver />
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Driver Profile</h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                            <label htmlFor="Id" className="block text-sm font-medium text-gray-700">
                               Driver ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                value={driverDetails.id}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter your Id"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Driver Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={driverDetails.name}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter Driver Name"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={driverDetails.email}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter your email"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                id="mobileNumber"
                                name="mobileNumber"
                                type="text"
                                value={driverDetails.mobileNumber}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter Mobile Number"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="carNumber" className="block text-sm font-medium text-gray-700">
                                Car Number
                            </label>
                            <input
                                id="carNumber"
                                name="carNumber"
                                type="text"
                                value={driverDetails.carNumber}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter Car Number"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                                License Number
                            </label>
                            <input
                                id="licenseNumber"
                                name="licenseNumber"
                                type="text"
                                value={driverDetails.licenseNumber}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter License Number"
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                                Aadhar Card Number
                            </label>
                            <input
                                id="aadharNumber"
                                name="cardLastFour"
                                type="text"
                                value={driverDetails.cardLastFour}
                                onChange={handleInputChange}
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300"
                                placeholder="Enter Aadhar Card Number"
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>

                            {isEditing && (
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
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

export default DriverProfile;