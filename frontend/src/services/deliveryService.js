// src/services/deliveryService.js
import api from './api';

// GET /api/deliveries
export const getDeliveries = () => api.get('/deliveries');

// GET /api/deliveries/:id
export const getDelivery = (id) => api.get(`/deliveries/${id}`);

// POST /api/deliveries
export const createDelivery = (data) => api.post('/deliveries', data);

// PUT /api/deliveries/:id/status?status=...
// Backend expects PUT at /{id}/status with request param "status"
export const updateDeliveryStatus = (id, status) =>
  api.put(`/deliveries/${id}/status`, null, { params: { status } });

// DELETE /api/deliveries/:id
export const deleteDelivery = (id) => api.delete(`/deliveries/${id}`);

export default {
  getDeliveries, getDelivery, createDelivery, updateDeliveryStatus, deleteDelivery
};
