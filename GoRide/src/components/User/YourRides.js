import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have your Firebase config file
import UserNavbar from "./UserNavbar";

const YourRides = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Input refs for Google Places Autocomplete
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  
  // State for new trip
  const [newTrip, setNewTrip] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    maxCapacity: 4
  });

  // Fetch user trips on component mount
  useEffect(() => {
    fetchUserTrips();
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    // Only initialize when the form is shown and Google API is loaded
    if (!showForm || !window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current, {
      types: ['geocode'],
    });

    const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current, {
      types: ['geocode'],
    });

    // Handle place selection for "From" field
    fromAutocomplete.addListener('place_changed', () => {
      const place = fromAutocomplete.getPlace();
      if (place && place.geometry) {
        setNewTrip(prev => ({ ...prev, from: place.formatted_address }));
      }
    });

    // Handle place selection for "To" field
    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      if (place && place.geometry) {
        setNewTrip(prev => ({ ...prev, to: place.formatted_address }));
      }
    });

    // Cleanup function to remove listeners
    return () => {
      if (fromInputRef.current) {
        window.google.maps.event.clearInstanceListeners(fromInputRef.current);
      }
      if (toInputRef.current) {
        window.google.maps.event.clearInstanceListeners(toInputRef.current);
      }
    };
  }, [showForm]); // Re-initialize when form visibility changes

  // Fetch trips from Firebase
  const fetchUserTrips = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("id"); // Get userId from localStorage
      if (!userId) {
        setError("User is not logged in");
        setLoading(false);
        return;
      }

      const tripsRef = collection(db, "trips");
      const querySnapshot = await getDocs(tripsRef);
      const userTrips = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.userId === userId) {
          userTrips.push({
            id: doc.id,
            ...data
          });
        }
      });

      setTrips(userTrips);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError("Error fetching trips");
      setLoading(false);
    }
  };

  // Handle regular input changes (date, time, capacity)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({
      ...newTrip,
      [name]: value
    });
  };

  // Handle form submission to create a new trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        setError("User is not logged in");
        return;
      }

      // Validation
      if (!newTrip.from || !newTrip.to || !newTrip.date || !newTrip.time) {
        setError("Please fill in all required fields");
        return;
      }

      const tripData = {
        ...newTrip,
        userId,
        createdAt: Timestamp.now(),
        passengers: []
      };

      await addDoc(collection(db, "trips"), tripData);
      
      // Reset form and fetch updated trips
      setNewTrip({
        from: "",
        to: "",
        date: "",
        time: "",
        maxCapacity: 4
      });
      setShowForm(false);
      setError(null);
      fetchUserTrips();
    } catch (err) {
      console.error("Error creating trip:", err);
      setError("Error creating trip");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">Your Rides</h2>
          
          {/* Create New Trip Button */}
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              {showForm ? "Cancel" : "+ Create New Trip"}
            </button>
          </div>

          {/* New Trip Form */}
          {showForm && (
            <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-purple-500">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Create New Trip</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">From</label>
                    <input
                      type="text"
                      name="from"
                      placeholder="City or address"
                      value={newTrip.from}
                      onChange={(e) => setNewTrip({...newTrip, from: e.target.value})}
                      ref={fromInputRef}
                      required
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">To</label>
                    <input
                      type="text"
                      name="to"
                      placeholder="City or address"
                      value={newTrip.to}
                      onChange={(e) => setNewTrip({...newTrip, to: e.target.value})}
                      ref={toInputRef}
                      required
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newTrip.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}  // Set min to current date
                      required
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newTrip.time}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Max Capacity</label>
                    <select
                      name="maxCapacity"
                      value={newTrip.maxCapacity}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Global Error Message */}
          {error && !showForm && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          {/* Loading State */}
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading your trips...</p>
          ) : (
            <>
              {/* Trip Cards */}
              {trips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <div key={trip.id} className="bg-gray-900 shadow-lg border border-purple-500 hover:shadow-xl transition-all rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg text-purple-400">Trip Details</h3>
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            {trip.passengers?.length || 0}/{trip.maxCapacity} seats
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p><strong className="text-gray-400">From:</strong> {trip.from}</p>
                          <p><strong className="text-gray-400">To:</strong> {trip.to}</p>
                          <p><strong className="text-gray-400">Date:</strong> {trip.date}</p>
                          <p><strong className="text-gray-400">Time:</strong> {trip.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-gray-900 p-8 rounded-lg border border-purple-500">
                  <p className="text-gray-400 mb-4">You don't have any trips yet.</p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Create Your First Trip
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default YourRides;