import { createRouter, createWebHistory } from 'vue-router'

import TV from '../components/Tv.vue'
import MainSelection from '../components/MainSelection.vue'
import StandardDisplaySelection from '../components/StandardDisplaySelection.vue'
import CanvasSelection from '../components/CanvasSelection.vue'
import ImageUpload from '../components/StaticImageUpload.vue'
import VideoUpload from '../components/VideoUpload.vue'
import ScheduleSelection from '../components/ScheduleSelection.vue'
import tb from '../components/Toolbar.vue'



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
      path: '/CanvasSelection',
      name: 'Canvas Selection',
      component: CanvasSelection
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
    },
  ]

})

export default router
