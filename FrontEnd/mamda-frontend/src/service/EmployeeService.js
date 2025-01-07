import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/employees'; 
const PRODUCTS_API_BASE_URL = '/products'; 

export const listEmployees = () => axiosInstance.get(REST_API_BASE_URL);

export const getDepartements = () => axiosInstance.get(REST_API_BASE_URL + '/departements');  

export const getEmployeesByDepartement = (departement) => axiosInstance.get(REST_API_BASE_URL + '/departement/' + departement);

export const addEmployee = (employee) => axiosInstance.post(REST_API_BASE_URL, employee);

export const getEmployee = (employeeId) => axiosInstance.get(REST_API_BASE_URL + '/' + employeeId);

export const updateEmployee = (employeeId, employee) => axiosInstance.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee = (employeeId) => axiosInstance.delete(REST_API_BASE_URL + '/' + employeeId);

export const getProductsByEmployeeId = (employeeId) => axiosInstance.get(REST_API_BASE_URL + '/' + employeeId + '/assigned-products');

export const assignProductToEmployee = (employeeId, product) => axiosInstance.post(REST_API_BASE_URL + '/' + employeeId + '/products', product);

export const deleteProductFromEmployee = (employeeId, productId) => axiosInstance.delete(REST_API_BASE_URL + '/' + employeeId + '/products/' + productId);

export const getAvailableProducts = () => axiosInstance.get(PRODUCTS_API_BASE_URL + '/available');

export const getAssignedProductsByEmployeeId = (employeeId) => axiosInstance.get(REST_API_BASE_URL + '/' + employeeId + '/assigned-products');
