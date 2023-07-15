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
      component: ScheduleDisplay,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/MainSelection',
      name: 'Main Selection',
      component: MainSelection,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
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
      component: ImageUpload,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/VideoUp',
      name: 'Video Upload',
      component: VideoUpload,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/ScheduleSelection',
      name: 'Schedule Selection',
      component: ScheduleSelection,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/Confirmation',
      name: 'Confirmation Page',
      component: Confirmation,
      // beforeEnter: (to, from, next) => {
      //   if (from.name === undefined) {
      //     next('/')
      //   } else {
      //     next()
      //   }
      // }
    },
    {
      path: '/QrScanner',
      name: 'Qr Scanner',
      component: QrScanner,
    }
  ]

})

export default router
