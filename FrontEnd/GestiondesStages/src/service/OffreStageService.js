import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/stages-offres'; 

export const listOffresStage = () => axiosInstance.get(REST_API_BASE_URL);

export const addOffreStage = (offrestage) => axiosInstance.post(REST_API_BASE_URL, offrestage);

export const getOffreStage = (offrestageId) => axiosInstance.get(REST_API_BASE_URL + '/' + offrestageId);

// export const getAllAssignedProducts = () => axiosInstance.get(REST_API_BASE_URL + '/assigned');

export const updateOffreStage = (offrestageId, offrestage) => axiosInstance.put(REST_API_BASE_URL + '/' + offrestageId, offrestage);

export const deleteOffreStage = (offrestageId) => axiosInstance.delete(REST_API_BASE_URL + '/' + offrestageId);

export const getFields = () => axiosInstance.get(REST_API_BASE_URL + '/fields');

export const getOffreStageByField = (field) => axiosInstance.get(REST_API_BASE_URL + '/field/' + field);  



