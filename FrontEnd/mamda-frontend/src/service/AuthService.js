import axiosInstance from './axiosInstance';

const REST_API_BASE_URL = '/auth/';

const login = (email, password) => {
  return axiosInstance.post(REST_API_BASE_URL + 'signin', {
    email,
    password,
  });
};

const forgotPassword = (email) => {
  return axiosInstance.post(REST_API_BASE_URL + 'forgotPassword', {
    email,
  });
};

const resetPassword = (password, token) => {
  return axiosInstance.post(REST_API_BASE_URL + 'resetPassword', {
    token,
    newPassword: password,
  });
}

export default { login, forgotPassword, resetPassword };
