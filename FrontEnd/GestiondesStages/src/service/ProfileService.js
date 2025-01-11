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

export const getAdminProfile = (adminId) => axiosInstance.get(`${REST_API_BASE_URL}/${adminId}`, getAuthHeaders());

export const updateAdminProfile = (adminId, admin) => axiosInstance.put(`${REST_API_BASE_URL}/${adminId}`, admin, getAuthHeaders());
