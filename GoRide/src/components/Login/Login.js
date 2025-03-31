import React, { useState } from 'react';

import { Link, data, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth,db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
async function handleLogin(navigate, setModalMessage, setModalVisible) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const id = userCredential.user.uid; // Get user ID after login
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef); // Await getDoc

        if (docSnap.exists()) {
            const userData = docSnap.data(); // Retrieve document data
            localStorage.setItem("id", id);
            localStorage.setItem("role", userData.role);
            localStorage.setItem("username", userData.name);

            console.log(localStorage.getItem("id"));

            if (userData.role === "user") {
                navigate("/search");
            } else if (userData.role === "driver") {
                navigate("/publish-ride");
            } else {
                setModalMessage("Role not recognized.");
                setModalVisible(true);
            }

            setModalMessage(`Login successful!\nWelcome ${userData.name}`);
            setModalVisible(true);
        } else {
            setModalMessage("User data not found.");
            setModalVisible(true);
        }
    } catch (error) {
        setModalMessage(error.message);
        setModalVisible(true);
    }
}
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }

        // Password validation
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        } else {
            setPasswordError('');
        }

        try {
            handleLogin(navigate,setModalMessage ,setModalVisible);
        } catch (error) {
            console.error('Error during login:', error);
            setModalMessage('An error occurred. Please try again later.');
            setModalVisible(true);
        }
    };

    // Redirect to signup page
    const handleCreate = () => {
        navigate('/signup');
    };


    // Close modal function
    const closeModal = () => {
        setModalVisible(false);
        // Optionally, you can navigate to a different page when the modal is closed
        // navigate('/'); // Uncomment if you want to redirect to home on modal close
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                            Login
                        </h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your email address"
                                />
                                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-1">
                            <div>

                                <button
                                    onClick={handleCreate}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 mt-4"
                                >
                                    Create New Account
                                </button>
                            </div>
                        </div>
                    </ div>
                </div>
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

export default Login;

/*
await signInWithEmailAndPassword(auth, email, password) //READ OPERATION
                .then((userCredential) => {
                    const id = auth.currentUser.uid;
                    try {
                        const docRef = doc(db, "users", id);
                        const docSnap = getDoc(docRef);
                            const userData = docSnap.data();
                            email = userData.email
                            localStorage.setItem('id', id);
                            localStorage.setItem('role', userData.role);
                            localStorage.setItem('username', userData.name);
                            console.log(localStorage.getItem('id'));
                            if (userData.role === 'user') {
                                navigate('/search');
                            } else if (userData.role === 'driver') {
                                navigate('/publish-ride');
                            } else {
                                setModalMessage('Role not recognized.');
                                setModalVisible(true);
                            }
                            setModalMessage('Login successful!');
                            setModalVisible(true);
                    }
                    catch (error) {
                        setModalMessage(error.message);
                        setModalVisible(true);
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setModalMessage(error.message);
                    setModalVisible(true);
                });*/