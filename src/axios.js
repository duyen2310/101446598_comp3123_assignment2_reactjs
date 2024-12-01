import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://101446598-comp-3123-assignment1.vercel.app/api/v1',  // Base URL of your backend API
    withCredentials: true,
});

export default axiosInstance;
