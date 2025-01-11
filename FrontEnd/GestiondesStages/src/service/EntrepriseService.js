import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/entreprises'; 
const PRODUCTS_API_BASE_URL = '/stages'; 

export const listEntreprises = () => axiosInstance.get(REST_API_BASE_URL);

export const getRaisonSociales = () => axiosInstance.get(REST_API_BASE_URL + '/raisonssociales');  

export const getEntreprisesByRaisonSociale = (raisonsociale) => axiosInstance.get(REST_API_BASE_URL + '/raisonsociale/' + raisonsociale);

export const addEntreprise = (entreprise) => axiosInstance.post(REST_API_BASE_URL, entreprise);

export const getEntreprise = (entrepriseId) => axiosInstance.get(REST_API_BASE_URL + '/' + entrepriseId);

export const updateEntreprise = (entrepriseId, entreprise) => axiosInstance.put(REST_API_BASE_URL + '/' + entrepriseId, entreprise);

export const deleteEntreprise = (entrepriseId) => axiosInstance.delete(REST_API_BASE_URL + '/' + entrepriseId);

export const getProductsByEntrepriseId = (entrepriseId) => axiosInstance.get(REST_API_BASE_URL + '/' + entrepriseId + '/assigned-products');

export const assignProductToEntreprise = (entrepriseId, product) => axiosInstance.post(REST_API_BASE_URL + '/' + entrepriseId + '/products', product);

export const deleteProductFromEntreprise = (entrepriseId, productId) => axiosInstance.delete(REST_API_BASE_URL + '/' + entrepriseId + '/products/' + productId);

export const getAvailableProducts = () => axiosInstance.get(PRODUCTS_API_BASE_URL + '/available');

export const getAssignedProductsByEntrepriseId = (entrepriseId) => axiosInstance.get(REST_API_BASE_URL + '/' + entrepriseId + '/assigned-products');
