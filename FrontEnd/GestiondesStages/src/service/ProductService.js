import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/products'; 

export const listProducts = () => axiosInstance.get(REST_API_BASE_URL);

export const addProduct = (product) => axiosInstance.post(REST_API_BASE_URL, product);

export const getProduct = (productId) => axiosInstance.get(REST_API_BASE_URL + '/' + productId);

export const getAllAssignedProducts = () => axiosInstance.get(REST_API_BASE_URL + '/assigned');

export const updateProduct = (productId, product) => axiosInstance.put(REST_API_BASE_URL + '/' + productId, product);

export const deleteProduct = (productId) => axiosInstance.delete(REST_API_BASE_URL + '/' + productId);

export const getCategories = () => axiosInstance.get(REST_API_BASE_URL + '/categories');

export const getProductByCategories = (categorie) => axiosInstance.get(REST_API_BASE_URL + '/categorie/' + categorie);  

export const isProductAssigned = (productId) => axiosInstance.get(REST_API_BASE_URL + '/' + productId + '/isAssigned');


