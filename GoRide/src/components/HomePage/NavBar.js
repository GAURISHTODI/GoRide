import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UserNavbar = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/signup'); // Redirect to signup page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to login page
    };

    // Define a custom style for the brand text
    const brandStyle = {
        color: '#007bff', // Blue color
        fontWeight: 'bold', // Bold text
        fontSize: '1.5rem', // Slightly larger font size
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={brandStyle}>GoRide</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#userNavbarNav"
                    aria-controls="userNavbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="userNavbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSignup}
                        >
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
