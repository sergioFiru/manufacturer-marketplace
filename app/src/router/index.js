import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import DirectoryView from '../views/DirectoryView.vue'
import DashboardView from '../views/DashboardView.vue'
import AdminView from '../views/AdminView.vue'
import ManufacturerDetailView from '../views/ManufacturerDetailView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/directory', name: 'directory', component: DirectoryView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/manufacturer/:id', name: 'manufacturer-detail', component: ManufacturerDetailView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/login', name: 'login', component: LoginView },
  ],
  linkActiveClass: 'text-blue-600 font-bold'
})

router.beforeEach(to => {
  const auth = useAuth()
  if (to.path === '/login' && auth.isAuthenticated) {
    return '/'
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }
  if (to.meta.requiresAdmin && auth.role !== 'admin') {
    return '/login'
  }
  return true
})

export default router
