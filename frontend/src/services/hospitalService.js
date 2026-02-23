import api from "./api";

/* ================= BASIC CRUD ================= */

// GET all hospitals
export const getHospitals = (params) =>
  api.get("/hospitals", { params });

// GET single hospital
export const getHospital = (id) =>
  api.get(`/hospitals/${id}`);

// ADMIN
export const createHospital = (payload) =>
  api.post("/hospitals", payload);

export const updateHospital = (id, payload) =>
  api.put(`/hospitals/${id}`, payload);

export const deleteHospital = (id) =>
  api.delete(`/hospitals/${id}`);

/* ================= NEAREST HOSPITALS ================= */
/*
  lat    → searched location latitude
  lng    → searched location longitude
  city   → optional city filter
  radius → distance in KM (default 10)
*/
export const getNearestHospitals = (lat, lng, city, radius = 10) =>
  api.get("/hospitals/nearest", {
    params: { lat, lng, city, radius },
  });