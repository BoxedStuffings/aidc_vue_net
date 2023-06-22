import { createRouter, createWebHistory } from 'vue-router'

import TV from '../components/Tv.vue'
import ScheduleDisplay from '../components/ScheduleDisplay.vue'
import MainSelection from '../components/MainSelection.vue'
import CanvasSelection from '../components/CanvasSelection.vue'
import ImageUpload from '../components/StaticImageUpload.vue'
import VideoUpload from '../components/VideoUpload.vue'
import ScheduleSelection from '../components/ScheduleSelection.vue'
import Confirmation from '../components/Confirmation.vue'
import QrScanner from '../components/ChatBotComponents/qrScanner.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Tv',
      component: TV
    },
    {
      path: '/ScheduleDisplay',
      name: 'Schedule Display',
      component: ScheduleDisplay
    },
    {
      path: '/MainSelection',
      name: 'Main Selection',
      component: MainSelection
    },
    {
      path: '/CanvasSelection',
      name: 'Canvas Selection',
      component: CanvasSelection,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
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
    {
      path: '/Confirmation',
      name: 'Confirmation Page',
      component: Confirmation
    },
    {
      path: '/QrScanner',
      name: 'Qr Scanner',
      component: QrScanner
    }
  ]

})

export default router
