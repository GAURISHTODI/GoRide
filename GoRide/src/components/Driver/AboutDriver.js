import React from 'react';
import NavbarDriver from '../Driver/NavBarDriver';

const AboutDriver = () => {
    return (
        <>
            <NavbarDriver />
            <section className="about-us py-10">
                <div className="container shadow-lg p-4"> {/* Main container with shadow */}
                    {/* Section Title */}
                    <h2 className="section-title text-3xl font-bold mb-6 text-center">
                        <i className="fab fa-users mr-2"></i>About Us
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
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Sarthak</h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Pratik</h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Female icon */}
                                <h4 className="team-name">Aishwarya</h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Jayprakash</h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Rohit</h4>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="team-member text-center shadow-md p-4 bg-blue-400 text-white"> {/* Team member container with light blue background */}
                                <i className="fas fa-user team-image"></i> {/* Male icon */}
                                <h4 className="team-name">Ayush</h4>
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
                /* Custom styles for AboutUs component */
                .about-us {
                    background-color: #f9f9f9; /* Light background for a clean look */
                    color: #333; /* Default text color */
                }

                .section-title {
                    color: #1a73e8; /* Accent color for headings */
                }

                .sub-title {
                    color: #007bff; /* Slightly different shade of blue for subtitles */
                }

                .section-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #555; /* Slightly muted text color for readability */
                }

                .team-member {
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Increased shadow for depth */
                    transition: transform 0.3s ease-in-out;
                }

                .team-member:hover {
                    transform: translateY(-10px); /* Hover effect for interactivity */
                }

                .team-image {
                    font-size: 80px; /* Adjust icon size */
                    margin-bottom: 10px;
                }

                .team-name {
                    font-weight: bold;
                    color: #fff; /* White text for better contrast */
                }

                /* Make sure the layout is responsive */
                @media (max-width: 768px) {
                    .team-member {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default AboutDriver;