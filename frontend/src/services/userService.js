// src/services/userService.js
import api from './api';

export const getUsers = () => api.get('/users');   // GET /api/users
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUser = (id) => api.delete(`/users/${id}`);
