import { createRouter, createWebHistory } from 'vue-router'

import TV from '../components/TheTv.vue'
import MainSelection from '../components/MainSelection.vue'
import StandardDisplaySelection from '../components/StandardDisplaySelection.vue'
import VariationSelection from '../components/VariationSelection.vue'
import ImageUpload from '../components/StaticImageUpload.vue'
import VideoUpload from '../components/VideoUpload.vue'
import ScheduleSelection from '../components/TheScheduleSelection.vue'


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
      path: '/StandardDisplay',
      name: 'Standard Display Selection',
      component: StandardDisplaySelection
    },
    {
      path: '/VariationSelection',
      name: 'Variation Selection',
      component: VariationSelection
    },
    {
      path: '/ImageUp',
      name: 'Static Image Upload',
      component: ImageUpload
    },
    {
      path: '/VideoUp',
      name: 'Video Upload',
      component: VideoUpload
    },
    {
      path: '/ScheduleSelection',
      name: 'Schedule Selection',
      component: ScheduleSelection
    }
  ]

})

export default router
