import api from './api';

export const getDonors = () => api.get('/donors');
export const createDonor = (body) => api.post('/donors', body);
export const approveDonor = (id) => api.put(`/donors/${id}/approve`);
export const deleteDonor = (id) => api.delete(`/donors/${id}`);

export default {
  getDonors,
  createDonor,
  approveDonor,
  deleteDonor
};
