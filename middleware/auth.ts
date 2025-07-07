export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return navigateTo('/authentication/login');
  }

  // Role based check
  if (to.path.startsWith('/super-admin') && role !== 'superadmin') {
    return navigateTo('/authentication/login');
  }

  if (to.path.startsWith('/admin') && role !== 'admin') {
    return navigateTo('/authentication/login');
  }

  if (to.path.startsWith('/user') && role !== 'user') {
    return navigateTo('/authentication/login');
  }
});
