// src/ridesData.js
import { useState } from 'react';

const useRides = () => {
  const [rides, setRides] = useState([
    { driver: "Aman", rating: 4.8, route: "Pimpri TO Swargate", date: "25th Nov, 2024", price: "450rs" },
    { driver: "Hrishi ", rating: 4.9, route: "ShivajiNagar TO Pimpri", date: "30th Nov, 2024", price: "300rs" },
    { driver: "Sunny ", rating: 4.7, route: "Manapa TO Chinchwad", date: "1st Jan, 2024", price: "200rs" },
  
  ]);

  const addRide = (newRide) => {
    setRides((prevRides) => [...prevRides, newRide]);
  };

  return { rides, addRide };
};

export default useRides;