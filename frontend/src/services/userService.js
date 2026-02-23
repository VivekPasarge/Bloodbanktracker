import api from "./api";

/* ================= GET ALL USERS (ADMIN ONLY) ================= */

export const getUsers = () => {
  return api.get("/users");
};

/* ================= DELETE USER (ADMIN ONLY) ================= */

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
