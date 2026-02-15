// src/services/requestService.js
import api from './api';

export const getRequests = () => api.get('/requests');          // GET /api/requests
export const getRequest = (id) => api.get(`/requests/${id}`);
export const createRequest = (payload) => api.post('/requests', payload);
export const updateRequest = (id, payload) => api.put(`/requests/${id}`, payload);
export const deleteRequest = (id) => api.delete(`/requests/${id}`);
