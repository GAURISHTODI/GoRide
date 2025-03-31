// src/components/QuoteSection.js
import React from 'react';

const QuoteSection = () => {
    return (
        <section style={{ backgroundColor: '#007BFF', color: 'white', padding: '40px 20px', marginTop: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1, textAlign: 'left', paddingRight: '20px' }}>
                    <h2 style={{ fontFamily: 'var(--font-secondary)', fontSize: '2.5rem', marginBottom: '80px' }}>Safety First</h2>
                    <div style={{ marginBottom: '20px', fontFamily: 'var(--font-secondary)', fontSize: '1.3rem' }}>
                        <p>"Your safety is our priority. Ride with peace of mind."</p>
                        <p>"Traveling together makes every journey safer."</p>
                        <p>"Ride smart, ride safe, ride together."</p>
                        <p>"Safety is not just a feature; it's our commitment."</p>
                    </div>
                </div>
                <div style={{ flex: 1, textAlign: 'right' }}>
                    <img 
                        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj333rgVUZ-4_NXB4HQHQxPJBvWBtqo7RJtVSHxjd1St05g-zK0v1LCbFJXjJL9015THgmaUDo5YzS2NCIrNQc2nPg2ZN1i7JUTIVbT3vhzi8hVCl8a0iuxBDIX1QspzkK9M0WD-Cm-mvXR-PmXjul9E-wm2p2S9Apmt82rh7FCLDge84AEkI6AKZlo-Ow/s1472/car%20with%20name%20_GoRide_%20%20in%20it%20sector.jpg" 
                        alt="Safety" 
                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                    />
                </div>
            </div>
        </section>
    );
};

export default QuoteSection;