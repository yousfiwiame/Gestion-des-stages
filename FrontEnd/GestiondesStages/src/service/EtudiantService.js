import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/etudiants'; 
const PRODUCTS_API_BASE_URL = '/stages'; 

export const listEtudiants = () => axiosInstance.get(REST_API_BASE_URL);

export const getFilieres = () => axiosInstance.get(REST_API_BASE_URL + '/departements');  

export const getEtudiantsByFiliere = (filiere) => axiosInstance.get(REST_API_BASE_URL + '/departement/' + filiere);

export const addEtudiant = (etudiant) => axiosInstance.post(REST_API_BASE_URL, etudiant);

export const getEtudiant = (etudiantId) => axiosInstance.get(REST_API_BASE_URL + '/' + etudiantId);

export const updateEtudiant = (etudiantId, etudiant) => axiosInstance.put(REST_API_BASE_URL + '/' + etudiantId, etudiant);

export const deleteEtudiant = (etudiantId) => axiosInstance.delete(REST_API_BASE_URL + '/' + etudiantId);

export const getProductsByEtudiantId = (etudiantId) => axiosInstance.get(REST_API_BASE_URL + '/' + etudiantId + '/assigned-products');

export const assignProductToEtudiant = (etudiantId, product) => axiosInstance.post(REST_API_BASE_URL + '/' + etudiantId + '/products', product);

export const deleteProductFromEtudiant = (etudiantId, productId) => axiosInstance.delete(REST_API_BASE_URL + '/' + etudiantId + '/products/' + productId);

export const getAvailableProducts = () => axiosInstance.get(PRODUCTS_API_BASE_URL + '/available');

export const getAssignedProductsByEtudiantId = (etudiantId) => axiosInstance.get(REST_API_BASE_URL + '/' + etudiantId + '/assigned-products');
