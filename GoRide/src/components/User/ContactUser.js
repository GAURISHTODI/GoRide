import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import UserNavbar from './UserNavbar';



const ContactUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

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
            const response = await axios.post('https://localhost:44345/api/Contact/submit', contactData);
            
            if (response.status === 200) {
                // Success message
                setSuccess(true);
                
                // Reset form fields
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            setError('There was an issue submitting your message. Please try again later.');
            console.error('Error submitting contact form:', error);
        }
    };

    return (
        <>
            <UserNavbar />
            <section className="bg-blue-50 dark:bg-slate-800" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                                Contact
                            </p>
                            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                                Get in Touch
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-xl text-blue-600 dark:text-slate-400">
                                GoRide is here to help you with your journey.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                                    We are here to assist with any queries or concerns.
                                </p>
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            {/* Address Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-blue-600 dark:text-white">Our Address</h3>
                                            <p className="text-gray-600 dark:text-slate-400">Pune,Maharashtra ,India</p>
                                            
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            {/* Contact Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d=" 5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-blue-600 dark:text-white">Contact</h3>
                                            <p className="text-gray-600 dark:text-slate-400">Mobile: +91 </p>
                                            <p className="text-gray-600 dark:text-slate-400">Mail: support@GoRide.com</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                                            {/* Working Hours Icon with Blue Color */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-blue-600 dark:text-white">Working hours</h3>
                                            <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                                            <p className="text-gray-600 dark:text-slate-400">Saturday &amp; Sunday: Closed</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Form */}
                            <div className="card h-fit max-w-6xl p-5 md:p-12 shadow-lg" id="form"> {/* Added shadow here */}
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
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                .input-group {
                    margin-bottom: 1.5rem;
                }
                .input-field {
                    width:  100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ddd;
                    font-size: 1rem;
                    outline: none;
                    box-sizing: border-box;
                    transition: border 0.3s ease;
                }
                .input-field:focus {
                    border: 1px solid #3490dc;
                    box-shadow: 0 0 0 2px rgba(52, 144, 220, 0.2);
                }
                .submit-btn {
                    background-color: #3b82f6;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s ease;
                }
                .submit-btn:hover {
                    background-color: #2779bd;
                }
            `}</style>
        </>
    );
};

export default ContactUser;
