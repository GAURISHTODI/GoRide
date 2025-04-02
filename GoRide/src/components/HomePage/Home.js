// src/Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Import the CSS file
import QuoteSection from './QuoteSection';
import Search from './Search';
import Page1 from './Page1';
import OffersSection from '../User/OffersSection';
import UserNavbar from './NavBar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import Features from './Features';
// import NavBar from './NavBar';

const Home = () => {
    return (
        <>

            <UserNavbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                    <DotLottieReact
                        src="https://lottie.host/b8b02675-01f5-41ba-8289-29d087579193/kAl8KvF1MI.lottie"
                        loop
                        autoplay
                        style={{ width: "600px", height: "600px" }} 
                    />
                </div>
            <div className="home-container bgd2"> {/* Added class here */}
                <h1 className="home-title tc">Travel Together, Save Together</h1>
                <p className="home-paragraph tc">Find a Ride, Make a Friend</p>

                {/* Changed input to textarea for scrolling */}
                {/* <input type="text" class="horizontal-scroll-input" placeholder="GoRide" /> */}

            </div>
           
            <Search />
            <Page1 />
            <OffersSection />
            <section id="features" className="container mx-auto px-4 space-y-6 bg-slate-50 py-8 md:py-12 lg:py-20">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl tc">Features</h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 tc3">
                        Our platform offers seamless ridesharing with user-friendly features designed to enhance your travel experience, whether you’re a driver or a passenger.
                    </p>

                </div>

                <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    {/* Feature Item 1: Real-Time Ride Matching */}
                    <div className="relative overflow-hidden rounded-lg border bgd2  select-none hover:shadow hover:shadow-teal-200 p-6 flex flex-col items-center space-y-4">
                        <i className="fas fa-sync-alt text-5xl text-teal-500"></i> {/* Real-time Matching Icon */}
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold tc2">Real-Time Ride Matching</h3>
                            <p className="text-sm tc3 text-muted-foreground">
                                Connect with nearby passengers or drivers instantly for a seamless GoRide experience.
                            </p>
                        </div>
                    </div>

                    {/* Feature Item 2: Driver and Passenger Profiles */}
                    <div className="relative overflow-hidden rounded-lg border bgd2  select-none hover:shadow hover:shadow-teal-200 p-6 flex flex-col items-center space-y-4">
                        <i className="fas fa-user-circle text-5xl text-yellow-500"></i> {/* User Profile Icon */}
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold tc2">Passenger Profiles</h3>
                            <p className="text-sm tc3">
                                View and manage your profile, vehicle details, and trip history for personalized experiences.
                            </p>
                        </div>
                    </div>

                    {/* Feature Item 3: Dynamic Pricing */}
                    <div className="relative overflow-hidden rounded-lg border bgd2  select-none hover:shadow hover:shadow-teal-200 p-6 flex flex-col items-center space-y-4">
                        <i className="fas fa-dollar-sign text-5xl text-green-500"></i> {/* Dynamic Pricing Icon */}
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold tc2">Cost Saving</h3>
                            <p className="text-sm tc3 text-muted-foreground">
                                Prices adjust in real-time based on demand, distance, and time, ensuring fair and transparent fares, using GoogleDistanceAPI
                            </p>
                        </div>
                    </div>

                    {/* Feature Item 4: Real-Time Distance Tracking */}
                    <div className="relative overflow-hidden rounded-lg border bgd2  select-none hover:shadow hover:shadow-teal-200 p-6 flex flex-col items-center space-y-4">
                        <i className="fas fa-map-marker-alt text-5xl text-blue-500"></i> {/* Location Tracking Icon */}
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold tc2">Real-Time Distance Tracking</h3>
                            <p className="text-sm tc3 text-muted-foreground">
                                Track your ride in real-time, ensuring you always know the location and estimated arrival time.
                            </p>
                        </div>
                    </div>

                    

                    {/* Feature Item 6: Trip Ratings & Reviews */}
                    <div className="relative overflow-hidden rounded-lg border bgd2  select-none hover:shadow hover:shadow-teal-200 p-6 flex flex-col items-center space-y-4">
                        <i className="fas fa-star text-5xl text-yellow-400"></i> {/* Rating & Review Icon */}
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold tc2">Live Satellite View</h3>
                            <p className="text-sm tc3 text-muted-foreground">
                                Review your ride experience, helping improve the platform and assisting other users.
                            </p>
                        </div>
                    </div>
                </div>
            </section>



            {/* <QuoteSection/> */}
        </>
    );
};

export default Home;