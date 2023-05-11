<script src="https://unpkg.com/vue-router@4"></script>
import { createRouter, createWebHistory } from 'vue-router'
import TV from '../components/TV.vue'
import MainSelection from '../components/MainSelection.vue'

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
    }
  ]
})

export default router
