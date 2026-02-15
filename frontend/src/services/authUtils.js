export function getRole() {
  return localStorage.getItem('role');
}

export function isAdmin() {
  return getRole() === 'ROLE_ADMIN';
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
