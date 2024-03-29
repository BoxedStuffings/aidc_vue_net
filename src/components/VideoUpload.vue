<script>
import { store } from '../Store.js'
import { useToast } from "vue-toastification"

export default {
  setup() {
    const toast = useToast()
    return {toast}
  },

  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      telegramBackButton: Telegram.WebApp.BackButton,
      vid: Object
    }
  },

  watch: {
    vid() {
      (store.videoObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }
  },

  methods: {
    selectVideoFile(fileEvent) {
      let video = fileEvent.target.files[0]

      console.log(video.type)
      video.type.indexOf('video/') !== 0 ? this.pushToast() : store.uploadVideo(video)

      if (store.videoObj instanceof File && video.type.indexOf('video/') == 0) {          
        this.display()
      }
    },

    display() {
      this.vid = URL.createObjectURL(store.videoObj)
      
      let preview = this.$refs.vidHolder
      preview.style.opacity = 1
      preview.animate(
        { transform: 'translateY(-8%)'},
        { duration: 600, fill: 'forwards'}
      )

      let slider = this.$refs.vidSlider
      slider.animate(
        { transform: 'translateY(130%)'}, 
        { duration: 600, fill: 'forwards'}
      )
    },

    pushToast() {
      this.toast.error('Invalid Video', {
        position: 'bottom-left',
        timeout: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.5,
        closeButton: 'button',
        icon: true
      })
    },

    colorTheme() {
      let icon = document.getElementsByTagName('span')
      if (store.telegramColorScheme == 'light') {
        icon[0].classList.add('light-upload')
      } else {
        icon[0].classList.add('dark-upload')
      }
    }

  },

  beforeMount() {
    const mainButton = () => {
      this.telegramMainButton.hide()
      store.setMediaType('Video')
      this.$router.push('/ScheduleSelection')
    }

    const backButton = () => {
      store.clearVideo()
      Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
      Telegram.WebApp.offEvent('backButtonClicked', backButton)
      this.telegramMainButton.hide()
      this.$router.go(-1)
    }

    this.telegramMainButton.setParams({ text: 'Next'})
    Telegram.WebApp.onEvent('mainButtonClicked', mainButton)

    Telegram.WebApp.onEvent('backButtonClicked', backButton)
  },

  mounted() {
    this.colorTheme()
    this.telegramBackButton.show()

    const preview = this.$refs.vidHolder
    let width = preview.getBoundingClientRect().width * 0.5625
    preview.style.maxHeight = `${width}px`

    if (store.videoObj instanceof File) {
      this.display()
    }
  }

}
</script>

<template>
  <div class="vid-upload-holder">
    <div class="vid-upload-content">
      <video ref="vidHolder" autoplay muted loop playsinline class="vid-upload-preview noselect" :src="vid"></video>
      <div ref="vidSlider" class="vid-upload-slider">
        <div class="vid-icon-holder"><span class='icon1'></span></div>
        <label class="btn btn-primary vid-upload-btn">
          Choose File
          <input type="file" accept="video/*" @change="(env) => selectVideoFile(env)"/>
        </label>
        <small>{{ store.videoObj.name }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vid-upload-holder{
  height: calc(100vh - 40px);
  position: relative;
  margin: 20px;
}
.vid-upload-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vh 2vw;
}
.vid-icon {
  height: 100%;
  scale: 1.2;
}
.vid-upload-preview {
  width: 85%;
  margin: 2%;
  opacity: 0;
  object-fit: fill;
  transition: all 1.5s;
}
.vid-upload-slider {
  position: absolute;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(0%);
}
.vid-upload-btn {
  max-width: 240px;
  width: 40vw;
  margin: 1%;
  background-color: var(--secondary);
  color: var(--tg-theme-button-text-color);
  font-size: 2.5vmin;
}
.vid-upload-btn:hover, :not(.btn-check) + .vid-upload-btn:active {
  background-color: #242862;
  border-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-button-text-colorr);
}
.icon1 {
  height: 70px;
  width: 70px;
  margin:0;
  display: block;
  /* Other styles here */
}
small {
  font-size: 1.5vmin;
}
input[type="file"] {
  display: none;
}
</style>