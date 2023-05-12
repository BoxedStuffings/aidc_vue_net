import { createRouter, createWebHistory } from 'vue-router'
import TV from '../components/TV.vue'
import MainSelection from '../components/MainSelection.vue'
import BootstrapTest from '../components/BootstrapTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Tv',
      component: TV
    },
    {
      path: '/MainSelection',
      name: 'Main Selection',
      component: MainSelection
    },
    {
      path: '/BootstrapTest',
      name: 'Bootstrap Test',
      component: BootstrapTest
    }
  ]
})

export default router
