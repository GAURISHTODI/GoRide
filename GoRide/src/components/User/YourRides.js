import React, { useEffect, useState, useRef } from "react";
import { doc, collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // Ensure you have your Firebase config file
import UserNavbar from "./UserNavbar";
import "./YourRides.css"

const YourRides = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Input refs for Google Places Autocomplete
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);
  const [isFocused6, setIsFocused6] = useState(false);

  // State for new trip
  const [newTrip, setNewTrip] = useState({
    name: "",
    phone: "",
    start: "",
    dest: "",
    date: "",
    time: "",
    max_person: "0",
    curr_person: "0",
    uid: ""
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
        setNewTrip(prev => ({ ...prev, start: place.formatted_address }));
      }
    });

    // Handle place selection for "To" field
    toAutocomplete.addListener('place_changed', () => {
      const place = toAutocomplete.getPlace();
      if (place && place.geometry) {
        setNewTrip(prev => ({ ...prev, dest: place.formatted_address }));
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
      const uid = localStorage.getItem("id");
      const requestsRef = collection(db, "requests");
      const querySnapshot1 = await getDocs(requestsRef);
      const userTrips = [];
      const passangersRef = collection(db, "passangers");
      const querySnapshot2 = await getDocs(passangersRef);
      let i = 0;
      console.log(uid);
      querySnapshot1.forEach((doc) => { // trips create by me
        const data = doc.data();
        if (data.uid === uid) {
          userTrips.push({
            id: ++i,
            ...data
          });
        }
      });
      querySnapshot2.forEach((doc) => { // trips in which i am part of
        const data = doc.data();
        console.log(data);
        if (data.pid === uid) {
          userTrips.push({
            id: ++i,
            ...data
          });
        }
      });
      console.log(userTrips.length == 0);
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
      if (!newTrip.start || !newTrip.dest || !newTrip.date || !newTrip.time) {
        setError("Please fill in all required fields");
        return;
      }
      newTrip.name = localStorage.getItem("username");
      const id = localStorage.getItem("id");
      newTrip.uid = id;
      newTrip.phone = localStorage.getItem("phone");
      newTrip.start = newTrip.start.toLowerCase().trim();
      newTrip.dest = newTrip.dest.toLowerCase().trim();
      const tripsRef = collection(db, "requests");
      await addDoc(tripsRef, newTrip);
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
      <div className="min-h-screen  bgch p-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center tch">Your Rides</h2>

          {/* Create New Trip Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className=" bgch3 font-bold py-2 px-4 rounded-lg"
            >
              {showForm ? "Cancel" : "+ Create New Trip"}
            </button>
          </div>

          {/* New Trip Form */}
          {showForm && (
            <div className="bg-gray-900 p-6 rounded-lg mb-6 bgch2">
              <h3 className="text-xl font-bold mb-4 tch">Create New Trip</h3>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">From</label>
                    <input
                      type="text"
                      name="from"
                      placeholder="City or address"
                      value={newTrip.start}
                      onChange={(e) => setNewTrip({ ...newTrip, start: e.target.value })}
                      ref={fromInputRef}
                      required
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
                      className="pc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">To</label>
                    <input
                      type="text"
                      name="to"
                      placeholder="City or address"
                      value={newTrip.dest}
                      onChange={(e) => setNewTrip({ ...newTrip, dest: e.target.value })}
                      ref={toInputRef}
                      required
                      onFocus={() => setIsFocused2(true)}
                      onBlur={() => setIsFocused2(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused2 ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused2 ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
                      className="pc"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={newTrip.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}  // Set min to current date
                      required
                      onFocus={() => setIsFocused3(true)}
                      onBlur={() => setIsFocused3(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused3 ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused3 ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={newTrip.time.toString()}
                      onChange={handleInputChange}
                      required
                      onFocus={() => setIsFocused4(true)}
                      onBlur={() => setIsFocused4(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused4 ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused4 ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">Max Capacity</label>
                    <select
                      name="max_person"
                      value={newTrip.max_person}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused5(true)}
                      onBlur={() => setIsFocused5(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused5 ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused5 ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium tch4 mb-1">Current capacity</label>
                    <select
                      name="curr_person"
                      value={newTrip.curr_person}
                      onChange={handleInputChange}
                      onFocus={() => setIsFocused6(true)}
                      onBlur={() => setIsFocused6(false)}
                      style={{
                        backgroundColor: "#1f1f1f",
                        color: `${isFocused6 ? "#f0ecfc" : "#9e7aff"}`,
                        border: `2px solid ${isFocused6 ? "#9e7aff" : "#534a6a"}`,
                        padding: "8px",
                        borderRadius: "5px",
                        width: "100%",
                        outline: "none", // Removes default browser outline
                      }}
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
                    className="w-full bg-purple-600 hover:bg-purple-700 tch6 font-bold py-2 px-4 rounded-lg pbh2"
                  >
                    Create Trip
                  </button>
                </div>
              </form>
            </div>
          )}
          {error && !showForm && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading your trips...</p>
          ) : (
            <>
              {/* Trip Cards */}
              {trips.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {trips.map((trip) => (
                    <div className="bgch2 shadow-lg bch hover:shadow-xl transition-all rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg text-purple-400">Trip by {trip.name}</h3>
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            {trip.curr_person || 0}/{trip.max_person} seats
                          </span>
                        </div>
                        <div className="">
                          <p><strong className="tch5">From:</strong> <span className="tch7">{trip.start}</span></p>
                          <p><strong className="tch5">To:</strong> <span className="tch7">{trip.dest}</span></p>
                          <p><strong className="tch5">Date:</strong> <span className="tch7">{trip.date}</span></p>
                          <p><strong className="tch5">Time:</strong> <span className="tch7">{(trip.time).toString()}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bgch2 p-8 rounded-lg bch">
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