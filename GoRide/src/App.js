import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import ProtectedRoute from './components/ProtectedRoute'; 
import { AuthProvider } from './components/NavigateAuth/AuthContext';
// Import components
import NavbarWrapper from './components/HomePage/NavbarWrapper';
import HeroSection from './components/HomePage/HeroSection';
import SearchSection from './components/User/SearchSection';
import PopularRides from './components/User/PopularRides';
import Footer from './components/HomePage/Footer';
import Home from './components/HomePage/Home';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import AboutUs from './components/HomePage/AboutUs';
import ContactUs from './components/HomePage/ContactUs';
import OffersSection from './components/User/OffersSection';
import NavbarDriver from './components/Driver/NavBarDriver';
import PublishRide from './components/Driver/PublishRide';
import UpcomingRides from './components/Driver/UpcomingRides';
import BookNow from './components/User/BookNow'; // Import the Book Now component
import useRides from './ridesData'; // Import the custom hook for rides
import SignupNavbar from './components/SignUp/SignupNavbar';
import ForgotPassword from './components/Login/ForgotPassword';
import Page1 from './components/HomePage/Page1';    
import QuoteSection from './components/HomePage/QuoteSection';
import TermsAndPolicy from './components/HomePage/TermsAndPolicy';
import Search from './components/HomePage/Search';
import YourRides from './components/User/YourRides';
import PaymentComponent from './components/Payments/PaymentComponent';
import PopRides from './components/User/PopRides';
// import PopularRidesUser  from './components/User/PopularRidesUser ';
// import AboutUser  from './components/User/AboutUser ';
// import ContactUser  from './components/User/ContactUser ';
import PopularRidesDriver from './components/Driver/PopularRidesDriver';
import ContactDriver from './components/Driver/ContactDriver';
import AboutDriver from './components/Driver/AboutDriver';
import Refer from './components/HomePage/Refer';
import Safety from './components/HomePage/Safety';

import AboutUser from './components/User/AboutUser';
import ContactUser from './components/User/ContactUser';
import UserProfile from './components/User/UserProfile';
import DriverProfile from './components/Driver/DriverProfile';
import ChatComponent from './components/ChatComponent';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ParentComponent from './components/ParentComponent';
import UpdatePassword from './components/Login/UpdatePassword';

import "./App.css"

const App = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [distance, setDistance] = useState(null);
    const [user, setUser ] = useState(null); // State to hold user information
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState({ from: '', to: '' });
    // Use the custom hook to manage rides
    const { rides, addRide } = useRides();
    const userId= localStorage.getItem('id');
    const handleSearch = (fromValue, toValue) => {
        setFrom(fromValue);
        setTo(toValue);
    };
    const [conn,setConnection]= useState();

    const joinChatRoom=async(username,chatroom)=>{
        try{
            const conn=HubConnectionBuilder()
                    .WithUrl("https://localhost:44345")
                    .configureLogging(LogLevel.Information)
                    .build();

                    conn.on("JoinSpecificChatRoom",(username,msg)=>{
                        console.log("msg:",msg)
                     });

                     await conn.start();
                     await conn.invoke("JoinSpecificChatRoom",{username,chatroom})

                     setConnection(conn);
        }catch(e){
            console.log(e)
        }
    }

    // Check for user authentication on app load
    useEffect(() => {
        const storedUser  = localStorage.getItem('user');
        if (storedUser ) {
            setUser (JSON.parse(storedUser )); // Set user state from local storage
        }
    }, []);

  

    return (
        <LoadScript googleMapsApiKey="AIzaSyBywJINBhCyFlA_8gTd5LMnHc975kEXQtE" libraries={['places']}>
            <div>
            <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login setUser={setUser} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/rides" element={<PopularRides />} />
    <Route path="/update-password" element={<UpdatePassword/>} />
    <Route path="/chat" element={<ParentComponent />} />

 

    {/* Protected Routes - Sirf Login Users Ke Liye */}
    <Route element={<ProtectedRoute />}>
    <Route path="/search" element={
                <>
                    <SearchSection 
                        onSearch={handleSearch} 
                        setDistance={setDistance} 
                        setSearchQuery={setSearchQuery}
                    />
                    <PopRides rides={rides} />
                </>
            } />
            <Route path="/your-rides" element={<YourRides />} />
            <Route path="/rides-driver" element={<PopularRidesDriver />} />
            <Route path="/contact-driver" element={<ContactDriver />} />
            <Route path="/about-driver" element={<AboutDriver />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/publish-ride" element={<PublishRide addRide={addRide} />} />
            <Route path="/upcoming-rides" element={<UpcomingRides />} />
            <Route path="/book-now" element={<PaymentComponent />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/refer" element={<Refer />} />
            <Route path="/user-rides" element={<YourRides />} />
            <Route path="/user-about" element={<AboutUser  />} />
            <Route path="/user-contact" element={<ContactUser  />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/driverprofile" element={<DriverProfile />} />
    </Route>
</Routes>



                    
                    
                    
        
                <Footer /> 
            </div>
        </LoadScript>
    );
};

export default App;