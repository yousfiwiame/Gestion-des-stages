import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/auth/profile'; 

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getUserProfile = (userId) => axiosInstance.get(`${REST_API_BASE_URL}/${userId}`, getAuthHeaders());

export const updateUserProfile = (userId, user) => axiosInstance.put(`${REST_API_BASE_URL}/${userId}`, user, getAuthHeaders());
