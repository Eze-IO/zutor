import { createRouter, createWebHistory } from 'vue-router';
import store from './store';

/*
  Routes & Views (each page is loaded on demand)
*/
const Home = () => import('./views/Home.vue');
const Help = () => import('./views/Help.vue');
const Profile = () => import('./views/Profile.vue');
const Session = () => import('./views/Session.vue');
const Dashboard = () => import('./views/Dashboard.vue');
const About = () => import('./views/About.vue');
const Login = () => import('./views/Login.vue');
const Register = () => import('./views/Register.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/help', name: 'help', component: Help },
    { path: '/login', name: 'login', component: Login },
    { path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: 'User Profile',
        requiresAuth: true
      }
    },
    { path: '/session/:id',
      name: 'edit_session',
      component: Session,
      meta: {
        title: 'Tutoring Session',
        requiresAuth: true
      }
    },
    { path: '/session',
      name: 'session',
      component: Session,
      meta: {
        title: 'Tutoring Session',
        requiresAuth: true
      }
    },
    { path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Session Manager',
        requiresAuth: true
      }
    },
    { path: '/register', name: 'register', component: Register },
    { path: '/:pathMatch(.*)*', redirect: '/' } // Redirect to home if anything other than
  ]
});

// check if pages require authentication
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    return store.getters.isLoggedIn ? true : '/';
  }
  if (['home', 'login', 'register'].includes(to.name) && store.getters.isLoggedIn) {
    return '/dashboard';
  }
  return true;
});

// Set default & page title
const DEFAULT_TITLE = 'Zutor! 👨‍🏫';
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
