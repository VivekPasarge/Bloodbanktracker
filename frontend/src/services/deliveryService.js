import api from './api';

export const getDeliveries = () => api.get('/deliveries');

export const createDelivery = (data) =>
  api.post('/deliveries', data);

export const updateDeliveryStatus = (id, status) =>
  api.put(`/deliveries/${id}/status`, null, {
    params: { status },
  });

export const deleteDelivery = (id) =>
  api.delete(`/deliveries/${id}`);
