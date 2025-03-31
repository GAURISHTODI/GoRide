import React from 'react';
import NavbarDriver from '../Driver/NavBarDriver';
import UserNavbar from './NavBar';

const AboutUs = () => {
    return (
        <>
            <UserNavbar />
            <section className="about-us py-10">
                <div className="container shadow-lg p-4"> {/* Main container with shadow */}
                    {/* Section Title */}
                    <h2 className="section-title text-3xl font-bold mb-6 text-center">
                        About Us
                    </h2>
                </div>

                {/* Our Mission */}
                <div className="container shadow-lg p-4 mb-6"> {/* Mission container with increased shadow */}
                    <h3 className="sub-title text-2xl font-semibold mb-4">
                        <i className="fas fa-bullseye mr-2"></i>Our Mission
                    </h3>
                    <p className="section-text">
                        At GoRide, we believe in making travel more affordable, sociable, and convenient. Our community-based travel network connects millions of members looking to share rides, making it easier for everyone to reach their destinations while reducing the environmental impact of travel. By leveraging technology, we aim to fill empty seats on the road, creating a more sustainable and connected world.
                    </p>
                </div>

                {/* How It All Started */}
                <div className="container shadow-lg p-4 mb-6"> {/* How It All Started container with increased shadow */}
                    <h3 className="sub-title text-2xl font-semibold mb-4">
                        <i className="fas fa-history mr-2"></i>How It All Started
                    </h3>
                    <p className="section-text">
                        The idea for GoRide was born out of a shared experience among our group during the Diwali festival. Each year, we faced significant challenges trying to get home to our families amidst the heavy traffic and limited transportation options. Frustrated by the difficulties of travel during this busy time, we realized there had to be a better way to connect people who were traveling in the same direction.
                    </p>
                    <p className="section-text">
                        This realization sparked our vision for a platform that would make travel easier and more accessible for everyone. We came together as a team to develop GoRide, a solution that not only addresses the challenges of holiday travel but also fosters a sense of community among travelers. Our goal is to ensure that no one has to face the journey alone, especially during times when family reunions are most important.
                    </p>
                </div>

                {/* Meet Our Team */}
                <div className="container shadow-lg p-4 mb-6"> {/* Meet Our Team container with increased shadow */}
                    <h3 className="sub-title text-2xl font-semibold mb-4">
                        <i className="fas fa-users mr-2"></i>Meet Our Team
                    </h3>
                    <div className="row mb-4">
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Anisha</h4>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Nilay</h4>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Female icon */}
                                <h4 className="team-name">Gaurish</h4>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Akshat</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join Us */}
                <div className="container shadow-lg p-4 mb-6"> {/* Join Us container with increased shadow */}
                    <h3 className="sub-title text-2xl font-semibold mb-4">
                        <i className="fas fa-handshake mr-2"></i>Join Us
                    </h3>
                    <p className="section-text">
                        Become a part of our growing community and experience the benefits of shared travel. Whether you're looking to save money, meet new people, or reduce your carbon footprint, GoRide is here to help you on your journey.
                    </p>
                </div>
            </section>

            {/* Add the styles below in the style tag */}
            <style jsx>{`
    /* Modern Dark Mode Styles */
    .about-us {
        background-color: #121212; /* Deep dark background */
        color: #e0e0e0; /* Light gray text */
        min-height: 100vh;
    }

    .container {
        background-color: #1e1e1e; /* Slightly lighter dark container */
        border-radius: 12px;
        border: 1px solid #2e2e2e; /* Subtle border */
        transition: all 0.3s ease;
    }

    .container:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .section-title {
        color: #9d7aff; /* Vibrant blue for main titles */
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .sub-title {
        color: #9d7aff; /* Soft purple for subtitles */
        position: relative;
        padding-left: 15px;
    }

    .sub-title:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 60%;
        width: 4px;
        background: linear-gradient(to bottom, #9d7aff, #6ac7ff);
        border-radius: 2px;
    }

    .section-text {
        font-size: 1.1rem;
        line-height: 1.7;
        color: #b0b0b0; /* Medium gray for readability */
    }

    .team-member {
        border-radius: 12px;
        padding: 25px 20px;
        background: linear-gradient(145deg, #252525, #1e1e1e);
        box-shadow: 5px 5px 15px #0a0a0a, 
                   -5px -5px 15px #2a2a2a;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: none;
        overflow: hidden;
        position: relative;
    }

    .team-member:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 8px 8px 25px #0a0a0a, 
                   -8px -8px 25px #2a2a2a;
    }

    .team-member:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(to right, #9d7aff, #9d7aff);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
    }

    .team-member:hover:after {
        transform: scaleX(1);
    }

    .team-image {
        font-size: 70px;
        margin-bottom: 15px;
        color: #e0e0e0;
        transition: all 0.3s ease;
    }

    .team-member:hover .team-image {
        transform: scale(1.1);
        color: #9d7aff;
    }

    .team-name {
        font-weight: 600;
        color: #fff;
        position: relative;
        display: inline-block;
    }

    .team-name:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: currentColor;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .team-member:hover .team-name:after {
        transform: scaleX(1);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .team-member {
            width: 100%;
            margin-bottom: 25px;
        }
        
        .container {
            padding: 20px 15px;
        }
        
        .section-title {
            font-size: 2rem;
        }
    }
`}</style>
        </>
    );
};

export default AboutUs;