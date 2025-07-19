import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { obtenerPaginasPermitidas } from '@/helpers/Autorizacion';

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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: () => import('@/views/EstudianteView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/estudiante/guardar',
    name: 'estudiante-guardar',
    component: () => import('@/views/EstudianteGuardarView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/estudiante/actualizar',
    name: 'estudiante-actualizar',
    component: () => import('@/views/EstudianteActualizarView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/estudiante/actualizar-parcial',
    name: 'estudiante-actualizar-parcial',
    component: () => import('@/views/EstudianteActualizarParcialView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/estudiante/borrar',
    name: 'estudiante-borrar',
    component: () => import('@/views/EstudianteBorrarView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: () => import('@/views/NotasIngresoView.vue'),
    meta: {
      requiresAuth: true, //protegida
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/RecursoProhibidoView.vue'),
    meta: {
      requiresAuth: true, //protegida
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
  if (to.meta.requiresAuth) {
    console.log("Auth")
    // Aquí deberías verificar si el usuario está autenticado
    if (!estaAutenticado()) {
      next({ name: 'login' });
    } else {
      //autenticado, aqui valido si esta autorizado
      let usuario = localStorage.getItem('usuario');
      let arreglos = obtenerPaginasPermitidas(usuario);
      if (arreglos.includes(to.path)) {
        next();
      } else {
        next('/403');
      }
    }
  } else {
    next();
  }
})

export default router
