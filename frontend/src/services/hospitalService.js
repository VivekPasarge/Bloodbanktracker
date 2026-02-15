// src/services/hospitalService.js
import api from './api';

export const getHospitals = (params) => api.get('/hospitals', { params });  // GET /api/hospitals?city=...
export const getHospital = (id) => api.get(`/hospitals/${id}`);
export const createHospital = (payload) => api.post('/hospitals', payload);
export const updateHospital = (id, payload) => api.put(`/hospitals/${id}`, payload);
export const deleteHospital = (id) => api.delete(`/hospitals/${id}`);
