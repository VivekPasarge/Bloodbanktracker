// src/services/authUtils.js

export function getRole() {
  return localStorage.getItem("role");
}

export function isAdmin() {
  return getRole() === "ROLE_ADMIN";
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}

export function logout() {
  // 🔒 CLEAR EVERYTHING RELATED TO AUTH
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("name");
}
