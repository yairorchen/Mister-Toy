import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import dashboard from '../views/dashboard.vue'
import shops from '../components/maps.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/toy',
      name: 'toy app',
      component: toyApp,
    },
    {
      path: '/toy/:_id',
      name: 'toy details',
      component: toyDetails,
    },
    {
      path: '/edit/:_id?',
      name: 'toy edit',
      component: toyEdit,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    },
    {
      path: '/shops',
      name: 'shops',
      component: shops,
    },
  ],
})

export default router
