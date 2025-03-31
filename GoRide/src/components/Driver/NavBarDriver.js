import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for toggler functionality
import { auth,db } from '../firebase'

const NavbarDriver = () => {
    const navigate = useNavigate();

    // Custom style for brand text
    const brandStyle = {
        color: '#007bff', 
        fontWeight: 'bold',
        fontSize: '1.5rem',
    };

    const handleProfileClick = () => {
        navigate('/driverprofile');
    };
    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        auth.signOut();
        navigate('/home');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/publish-ride" style={brandStyle}>GoRide</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse"   // Updated for Bootstrap 5
                    data-bs-target="#navbarNav" // Updated for Bootstrap 5
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/publish-ride">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rides-driver">Rides</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about-driver">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact-driver">Contact Us</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handleProfileClick}
                        >
                            Profile
                        </button>
                        <button
                            className="btn btn-outline-success me-2"
                            onClick={() => navigate('/chat')} // Navigate to chat
                        >
                            Chat
                        </button>
                        <Link className="btn btn-primary me-2" onClick={handleLogout}>Logout</Link>
                        <Link className="btn btn-success" to="/publish-ride">Publish a Ride</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDriver;
