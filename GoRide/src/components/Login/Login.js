import React, { useState } from 'react';
import "./login.css"
import { Link, data, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
async function handleLogin(navigate, setModalMessage, setModalVisible, email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const id = userCredential.user.uid;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            localStorage.setItem("id", id);
            localStorage.setItem("username", userData.name);
            localStorage.setItem("email", userData.email);
            localStorage.setItem("phone", userData.mobileNumber);
            console.log(localStorage.getItem("id"));
            setModalMessage(`Login successful!\nWelcome ${userData.name}`);
            setModalVisible(true);
            navigate("/search");
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
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email address');
            return;
        } else {
            setEmailError('');
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
        } else {
            setPasswordError('');
        }
        try {
            handleLogin(navigate, setModalMessage, setModalVisible, email, password);
        } catch (error) {
            console.error('Error during login:', error);
            setModalMessage('An error occurred. Please try again later.');
            setModalVisible(true);
        }
    };
    const handleCreate = () => {
        navigate('/signup');
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bgcl">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10 bgc2l">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-2xl font-bold tcl mb-6 text-center">
                            Welcome Back!
                        </h2>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium tc3l">
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
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    style={{
                                        backgroundColor: "#1f1f1f",
                                        color: `${isFocused ? "#9e7aff" : "#8164d0"}`,
                                        border: `2px solid ${isFocused ? "#9e7aff" : "#534a6a"}`,
                                        padding: "8px",
                                        borderRadius: "5px",
                                        width: "100%",
                                        outline: "none", // Removes default browser outline
                                    }}
                                    placeholder="Enter your email address"
                                />
                                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium tc3l">
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
                                    placeholder="Enter your password"
                                    onFocus={() => setIsFocused2(true)}
                                    onBlur={() => setIsFocused2(false)}
                                    style={{
                                        backgroundColor: "#1f1f1f",
                                        color: `${isFocused ? "#9e7aff" : "#8164d0"}`,
                                        border: `2px solid ${isFocused2 ? "#9e7aff" : "#534a6a"}`,
                                        padding: "8px",
                                        borderRadius: "5px",
                                        width: "100%",
                                        outline: "none", // Removes default browser outline
                                    }}
                                />
                                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                           
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bgc3l bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 pbl"
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
                                <span className="px-2 bg-gray-100 text-gray-500 bgc2l tcl">
                                    New to us ?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-1">
                            <div>

                                <button
                                    onClick={handleCreate}
                                    className="w-full flex items-center justify-center px-8 py-3 border  rounded-md  text-sm font-medium bgc3l mt-4 pbl"
                                >
                                    Create New Account
                                </button>
                            </div>
                        </div>
                    </ div>
                </div>
            </div>
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