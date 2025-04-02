import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import UserNavbar from './UserNavbar';
import "./ContactUser.css"
import { auth, provider, db } from '../firebase'
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { FaUser, FaEnvelope, FaLock, FaCar, FaIdCard, FaCheckCircle } from 'react-icons/fa';
const ContactUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!name || !email || !message) {
            setError('All fields are required.');
            return;
        }

        setError('');
        
        // Prepare the data for submission
        const contactData = {
            name,
            email,
            message
        };

        try {
            // Make the API call
            const userRef = doc(db, "messages",email.split("@")[0]); //Create & Update operation
            await setDoc(userRef, {
                name: name,
                email: email,
                message: message
            });
            setModalMessage("Your message was sent to the admin");
            setModalVisible(true);
        } catch (error) {
            setError('There was an issue submitting your message. Please try again later.');
            console.error('Error submitting contact form:', error);
        }
    };
    const closeModal = () => {
        setModalVisible(false);
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
            <UserNavbar />
            <section className="text-light dark:bg-slate-800" id="contact">
                <div className="bgd2 text-light mx-auto max-w-7xl m-5 px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ">
                <div className="mb-12">
                        <div className="max-w-3xl mx-auto text-center tc">
                            <p className="text-lg font-semibold uppercase tracking-wide text-[#6ac7ff]">
                                Contact
                            </p>
                            <h2 className="mt-4 text-4xl font-bold tc sm:text-5xl tc">
                                Get in Touch
                            </h2>
                            <p className="mt-4 text-xl tc3 text-[#b0b0b0]">
                                GoRide is here to help you with your journey.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg tc dark:text-slate-400">
                                    We are here to assist with any queries or concerns.
                                </p>
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bgc text-gray-50">
                                            {/* Address Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e7aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 tc dark:text-white">Our Address</h3>
                                            <p className="tc3 dark:text-slate-400">Vellore Institute of Technology, Vellore,India</p>
                                            
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bgc text-gray-50">
                                            {/* Contact Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e7aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d=" 5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 tc dark:text-white">Contact</h3>
                                            <p className="text-gray-600 dark:text-slate-400">Mobile: +91 </p>
                                            <p className="tc3 dark:text-slate-400">Mail: support@GoRide.com</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bgc text-gray-50">
                                            {/* Working Hours Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9e7aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 tc dark:text-white">Working hours</h3>
                                            <p className="tc3 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                            <p className="tc3 dark:text-slate-400">Saturday &amp; Sunday: Closed</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Form */}
                            <div className=" tc card h-fit max-w-6xl p-5 md:p-12 shadow-lg bgd" id="form"> {/* Added shadow here */}
                                <h2 className="mb-4 text-2xl font-bold dark:text-white">Ready to Get Started?</h2>
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    <div className="contact-form-container">
                                        <div className="mb-6">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    placeholder="Your name"
                                                    className="input-field"
                                                />
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="Your email address"
                                                    className="input-field"
                                                />
                                            </div>
                                        </div>
                                        <div className="input-group">
                                            <textarea
                                                id="textarea"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                                placeholder="Write your message..."
                                                className="input-field"
                                                rows="5"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="submit-btn">
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .contact-form-container {
        background-color: #1e1e1e;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #2e2e2e;
        transition: all 0.3s ease;
    }

    .contact-form-container:hover {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }

    .input-group {
        margin-bottom: 2rem;
        position: relative;
    }

    .input-field {
        width: 100%;
        padding: 14px 16px;
        border-radius: 8px;
        border: 1px solid #333;
        font-size: 1rem;
        outline: none;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        background-color: #252525;
        color: #e0e0e0;
    }

    .input-field:focus {
        border: 1px solid #6ac7ff;
        box-shadow: 0 0 0 3px rgba(106, 199, 255, 0.2);
        background-color: #2a2a2a;
    }

    .input-field::placeholder {
        color: #555;
    }

    .input-group:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, #6ac7ff, #9d7aff);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .input-group:focus-within:after {
        transform: scaleX(1);
    }

    .submit-btn {
        // background-color:#2f2a3c;
        color: #9e7aff;
        padding: 14px 28px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        box-shadow: 0 4px 15px rgba(157, 122, 255, 0.53);
        width: 100%;
        position: relative;
        overflow: hidden;
        z-index: 1;
    }

    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px #9d7aff;
    }

    .submit-btn:active {
        transform: translateY(0);
    }

    .submit-btn:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // background: linear-gradient(145deg, #9d7aff, #6ac7ff);
        // background-color:#9d7aff;
        color: #534a6a;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .submit-btn:hover:after {
        opacity: 1;
    }

    @media (max-width: 768px) {
        .contact-form-container {
            padding: 20px;
        }
        
        .input-field {
            padding: 12px 14px;
        }
        
        .submit-btn {
            padding: 12px 24px;
        }
    }
            `}</style>
        </>
    );
};

export default ContactUser;
