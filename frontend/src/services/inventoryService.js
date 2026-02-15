// src/services/inventoryService.js
import api from './api';

export const getInventory = () => api.get('/inventory');         // GET /api/inventory
export const getInventoryById = (id) => api.get(`/inventory/${id}`);
export const createInventory = (payload) => api.post('/inventory', payload);
export const updateInventory = (id, payload) => api.put(`/inventory/${id}`, payload);
export const deleteInventory = (id) => api.delete(`/inventory/${id}`);
