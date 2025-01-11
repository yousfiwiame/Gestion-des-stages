import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Token being sent:', token); // Debug log
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Full Authorization header:', config.headers.Authorization); // Debug log
        } else {
            console.log('No token found in localStorage'); // Debug log
        }
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error); // Debug log
        return Promise.reject(error);
    }
);


export default axiosInstance;