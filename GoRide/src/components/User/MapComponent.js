import React, { useEffect, useRef } from 'react';

const MapComponent = ({ from, to, setDistance }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!from || !to) return;

        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 7,
            center: { lat: 20.5937, lng: 78.9629 }, // Centered over India
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer({ map });

        const request = {
            origin: from,
            destination: to,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true,
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);

                // Extract distance and duration from the first route
                const leg = result.routes[0].legs[0];
                if (leg) {
                    setDistance({
                        distance: leg.distance.text,
                        duration: leg.duration.text,
                    });
                }
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });

        return () => {
            directionsRenderer.setMap(null);
        };
    }, [from, to, setDistance]);

    return <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
