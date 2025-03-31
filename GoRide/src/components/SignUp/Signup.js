import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FaUser, FaEnvelope, FaLock, FaCar, FaIdCard, FaCheckCircle } from 'react-icons/fa'; // Importing icons
import { auth, provider ,db} from '../firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc,doc ,setDoc} from "firebase/firestore"; 
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [cardLastFour, setCardLastFour] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }

        // Password validation
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one number and one special character');
            return;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else {
            setConfirmPasswordError('');
        }

        // Mobile number validation
        const isCountryCodeSelected = mobileNumber && mobileNumber.length === 13; // Check if country code is included
        const isValidMobileNumber = isCountryCodeSelected || (mobileNumber.length === 10 && !isCountryCodeSelected);
        if (!isValidMobileNumber) {
            setMobileError('Mobile number must be 13 digits with country code or 10 digits without it');
            return;
        } else {
            setMobileError('');
        }

        if (emailRegex.test(email) && passwordRegex.test(password) && password === confirmPassword && isValidMobileNumber) {
            const user1 = { name,  email, password, carNumber, licenseNumber, cardLastFour, mobileNumber };

            try {
                await createUserWithEmailAndPassword(auth, email, password)  //CREATE OPERATION
                    .then((userCredential) => {
                        const user = userCredential.user;
                        try{
                            const userRef = doc(db, "users", auth.currentUser.uid);
                            setDoc(userRef, {
                                uid: auth.currentUser.uid,
                                name: name,
                                email: email,
                                mobileNumber: mobileNumber
                            });
                              setModalMessage(userCredential.message);
                              setModalVisible(true);
                        }
                        catch(error){
                            setModalMessage('Signup failed: ' + (error.message));
                            setModalVisible(true);
                        }

                    })
                    .catch((error) => {
                        setModalMessage('Signup failed: ' + (error.message));
                        setModalVisible(true);
                    });
            } catch (error) {
                setModalMessage('Signup failed: ' + (error.response?.data?.error || error.message));
                setModalVisible(true);
            }
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        navigate('/login');
    };
    return (
        <>
            {modalVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <FaCheckCircle className="text-green-600 mx-auto mb-4" size={50} />
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

            <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Plain background */}
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Let's Get You in!</h2>
                    <form onSubmit={handleSubmit} className="text-black">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    if (e.target.value !== 'driver') {
                                        setCarNumber('');
                                        setLicenseNumber('');
                                        setCardLastFour('');
                                    }
                                }}
                                required
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select a role</option>
                                <option value="user">User  </option>
                                <option value="driver">Driver</option>
                            </select>
                        </div> */}
                        {/* { true && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carNumber">Car Number</label>
                                    <div className="relative">
                                        <FaCar className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="carNumber"
                                            placeholder="Car Number"
                                            value={carNumber}
                                            onChange={(e) => setCarNumber(e.target.value)}
                                            required
                                            className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licenseNumber">Driver's License Number</label>
                                    <div className="relative">
                                        <FaIdCard className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="licenseNumber"
                                            placeholder="Driver's License Number"
                                            value={licenseNumber}
                                            onChange={(e) => setLicenseNumber(e.target.value)}
                                            required
                                            className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardLastFour">Aadhar Card Number</label>
                                    <div className="relative">
                                        <FaIdCard className="absolute left-3 top-2.5 text-gray-400" />
                                        <input
                                            type="text"
                                            id="cardLastFour"
                                            placeholder="Last Four Digits"
                                            value={cardLastFour}
                                            onChange={(e) => setCardLastFour(e.target.value)}
                                            required
                                            className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                    </div>
                                </div>
                            </>
                        )} */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">Mobile Number</label>
                            <PhoneInput
                                id="mobileNumber"
                                placeholder="Enter mobile number"
                                value={mobileNumber}
                                onChange={setMobileNumber}
                                required
                                defaultCountry="IN"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${mobileError ? 'border-red-500' : ''}`}
                            />
                            {mobileError && <p className="text-red-500 text-xs">{mobileError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''}`}
                                />
                                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''}`}
                                />
                                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-2.5 text-gray-400" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className={`shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${confirmPasswordError ? 'border-red-500' : ''}`}
                                />
                                {confirmPasswordError && <p className="text-red-500 text-xs">{confirmPasswordError}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline mb-2"
                            >
                                Sign Up
                            </button>
                            <p className="text-center mt-4">
                                Already know us? <Link to="/login" className="text-blue-500">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;