import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';


const UserNavbar = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const brandStyle = {
        color: '#9d7aff',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    };



    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={{ backgroundColor: '#1e1e1e' }}>
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
                            <Link className="nav-link tc2 purp" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link tc2 purp" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link tc2 purp" to="/contact">Contact Us</Link>
                        </li>
                    </ul>

                    <div className="d-flex">
                        <button
                            className="btn  me-2 pb"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <button
                            className="btn pb"
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