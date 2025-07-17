import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EstudianteView from '@/views/EstudianteView.vue'
import LoginView from '@/views/LoginView.vue'

function estaAutenticado() {
  let result = localStorage.getItem('auth') === 'true';
  console.log(result)
  return result;
}
const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true, //protección de ruta
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log("Antes")
  if(to.meta.requiresAuth) {
    console.log("Auth")
    // Aquí deberías verificar si el usuario está autenticado
    if (!estaAutenticado()) {
      next({ name: 'login' });
    } else {
      next();
    }
  }else {
    next();
  }
})  

export default router
