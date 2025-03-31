// src/components/Page1.js
import React from 'react';

const Page1 = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-3xl font-bold mb-4 text-blue-600 Arial, sans-serif">Welcome to Our GoRide Service</h1>
                    <p className="text-lg mb-4  Arial, sans-serif">
                    GoRide services offer numerous benefits, including cost savings, environmental advantages, and enhanced convenience. By utilizing GoRide programs, individuals can contribute to reducing traffic congestion and emissions while enjoying a more connected community.Our platform connects you with reliable drivers in your area, ensuring a safe and enjoyable ride every time. Whether you're commuting to work, heading to the airport, or going out for a night on the town, we've got you covered.
                    </p>
                </div>
                <div className="flex-1 flex items-end justify-center">
                    <img 
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWelS43oB6BpKAFWM2nZj3Hr-zZMdwbYf_FFOIaF_x0aCA7wbbyHQifwphblwgrLqWG2pWv-L0Jb0WA2nZGDvnywuVGzthjox1yQcbd_utqUbwu2CNfo7OyKrVss3F05kLqZlkLQTXTcUXwiQBxQTFZx6v5WwawNPDVSA9Af8Xt0TC91CTDulRIEqy9NM/s1472/white%20car%20with%20name%20_GoRide_%20%20on%20road%20promotion%20banner%20and%20car%20parked%20below%20it%20named%20GoRide%20promoting%20GoRide%20a%20platform%20of%20sharing%20cab%20booking.jpg" 
                        alt="Offer" 
                        style={{ width: '861px', height: '286px', objectFit: 'cover' }} // Set width and height
                        className="rounded-lg" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Page1;