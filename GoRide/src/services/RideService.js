import axios from 'axios';

const API_URL = 'http://GoRide.ap-south-1.elasticbeanstalk.com/api/rides';

const RideService = {
    getRides: () => {
        return axios.get(API_URL);
    },
    offerRide: (ride) => {
        return axios.post(API_URL, ride);
    }
};

export default RideService;