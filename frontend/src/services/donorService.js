// src/services/donorService.js
import api from './api';

export const getDonors = () => api.get('/donors');          // GET /api/donors
export const getDonor  = (id) => api.get(`/donors/${id}`);  // optional: GET single
export const createDonor = (body) => api.post('/donors', body);
export const deleteDonor = (id) => api.delete(`/donors/${id}`);
export default {
  getDonors, getDonor, createDonor, deleteDonor
};
