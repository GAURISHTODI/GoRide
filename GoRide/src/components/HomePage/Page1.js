// src/components/Page1.js
import React from 'react';
import "./Page1.css"

const Page1 = () => {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 mb-8 md:mb-0 md:mr-8">
                    <h1 className="text-3xl font-bold mb-4 text-blue-600 Arial, sans-serif tc">Welcome to Our GoRide Service</h1>
                    <p className="text-lg mb-4  Arial, sans-serif tc3">
                    GoRide services offer numerous benefits, including cost savings, environmental advantages, and enhanced convenience. By utilizing GoRide programs, individuals can contribute to reducing traffic congestion and emissions while enjoying a more connected community.Our platform connects you with reliable drivers in your area, ensuring a safe and enjoyable ride every time. Whether you're commuting to work, heading to the airport, or going out for a night on the town, we've got you covered.
                    </p>
                </div>
                <div className="flex-1 flex items-end justify-center">
                    <img 
                        src="https://scontent.fmaa2-1.fna.fbcdn.net/o1/v/t0/f2/m340/AQOhjNqN7IMPx_sWEXtH4tbSE43oTTApOdD4TMmWX-T7KN2qKTmr8BxXRMTnmMohVxqb-2SvwQxYQGfiVyffWKgIih5pf2uBIgAj2zx7smdBYRAh3Bg7_f_zw_WEjDcUN8zAebJS3qdgdcHerh8yd-owk2o.jpeg?_nc_ht=scontent.fmaa2-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=AdlhwiVMkoq5anwjDM0UIN0tBfkZTprQI8fCS8hAb6r79jYS1EeoBKrnQzwq3IX7GshY8kNCVOZRG-OCIZMlBsE8&ccb=9-4&oh=00_AYFBkA0Y_6eKvDFHXS75OpF5mUQ7UbFwIXojqjPMr0fDzg&oe=67EF6171&_nc_sid=5b3566" 
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