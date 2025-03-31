import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for toggler functionality
import { auth,db } from '../firebase'
const UserNavbar = () => {
    const [isRideSuccessful, setIsRideSuccessful] = useState(false); // Track ride status
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/login'); // Redirect to login page on logout
    };

    const handleLogin = () => {
        navigate('/userprofile'); // Redirect to user profile page
    };

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        auth.signOut();
        navigate('/');
    };

    // Custom style for brand text
    const brandStyle = {
        color: '#007bff', // Blue color
        fontWeight: 'bold',
        fontSize: '1.5rem',
    };

    // Simulating a check for ride success (this can be replaced with actual logic)
    useEffect(() => {
        // Here, fetch or check the actual ride status (e.g., API call, or from app state)
        // For now, we assume the ride is successful
        setIsRideSuccessful(true); // Simulated for now, replace with your logic
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/search" style={brandStyle}>GoRide</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"  // Updated for Bootstrap 5
                    data-bs-target="#userNavbarNav" // Updated for Bootstrap 5
                    aria-controls="userNavbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="userNavbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user-rides">Rides</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user-about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user-contact">Contact Us</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handleLogin}
                        >
                            Profile
                        </button>
                        <button
                            className="btn btn-outline-success me-2"
                            onClick={() => navigate('/chat')} // Navigate to chat
                        >
                            Chat
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>

            
        </nav>
    );
};

export default UserNavbar;
