// src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="bg-blue-600 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Travel Together Save Together</h1>
                <p className="text-lg mb-8">Find a Ride, Make a Friend</p>

                <Link to="/search" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold">
                    Search for a ride
                </Link>


            </div>
        </section>
    );
};

export default HeroSection;