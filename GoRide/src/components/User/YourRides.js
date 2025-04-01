import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";

const YourRides = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPaymentDetails = async () => {
            try {
                const userId = localStorage.getItem("id"); // Get userId from localStorage
                if (!userId) {
                    console.error("User is not logged in");
                    setError("User is not logged in");
                    return;
                }

                // Fetch payment details for the user
                const response = await axios.get(
                    `http://rideshare.ap-south-1.elasticbeanstalk.com/${userId}`  // Correct API endpoint
                );

                // Set payment details to the state
                setPaymentDetails(response.data); 
            } catch (error) {
                console.error("Error fetching payment details:", error);
                setError("Error fetching payment details");
            }
        };

        fetchUserPaymentDetails();
    }, []);

    // Function to determine the text color based on payment status
    const getStatusStyle = (status) => {
        if (status.toLowerCase() === "success") {
            return "text-green-600 font-bold";  // Green text for success
        }
        return "text-blue-600 font-bold";  // Blue text for other statuses
    };

    return (
        <>
        <UserNavbar />
        <div className="max-w-5xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Payment Details</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {paymentDetails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {paymentDetails.map((payment) => (
                        <div key={payment.paymentId} className="bg-white shadow-lg border border-green-300 hover:shadow-xl hover:border-green-400 transition-all rounded-xl p-4 flex flex-col justify-between">
                            <div>
                                <p><strong>Payment ID:</strong> {payment.paymentId}</p>
                                <p className={getStatusStyle(payment.status)}><strong>Status:</strong> {payment.status}</p>
                                <p><strong>Amount:</strong> ₹{payment.amount}</p>
                                <p><strong>Route:</strong> {payment.route}</p>
                                <p><strong>Driver ID:</strong> {payment.driverId}</p>
                                <p><strong>Date:</strong> {payment.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center">No payment details found for your rides.</p>
            )}
        </div>
        </>
    );
};

export default YourRides;
