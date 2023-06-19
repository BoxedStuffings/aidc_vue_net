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
      // (store.videoObj instanceof File) ? console.log("open") : console.log("close")
      (store.videoObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }
  },

  methods: {
    selectVideoFile(fileEvent) {
      let video = fileEvent.target.files[0]

      console.log(video.type)
      video.type.indexOf('video/') !== 0 ? this.pushToast : store.uploadVideo(video)

      // test
      if (store.videoObj instanceof File && video.type.indexOf('video/') == 0) {          
        this.vid = URL.createObjectURL(store.videoObj)
      }
    },

    pushToast() {
      this.toast.error('Invalid Video', {
        position: 'bottom-left',
        timeout: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.60,
        closeButton: 'button',
        icon: true,
      })
    }

  },

  mounted() {
    if (store.videoObj instanceof File) {
      this.vid = URL.createObjectURL(store.videoObj)
    }

    this.telegramMainButton.setParams({ text: 'Next'})
    Telegram.WebApp.onEvent('mainButtonClicked', () => {
      this.telegramMainButton.hide(),
      store.setMediaType('Video'),
      this.$router.push('/ScheduleSelection')
    })

    this.telegramBackButton.show()
    Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.telegramMainButton.hide(),
      store.clearVideo(),
      this.$router.go(-1)
    })
  }

}
</script>

<template>
    <div class="vid-upload-holder">
        <video autoplay muted loop playsinline id="vid-bg" :src="vid"></video>
        <div class="vid-upload-content">
            <!-- <img class="vid-upload-icon noselect" src="../assets/boxedstuffings.png"> -->
            <div class="vid-icon-holder"><font-awesome-icon icon="fa-solid fa-upload"  class="vid-icon" /></div>
            <label class="btn btn-primary vid-upload-btn">
                Choose File
                <input type="file" accept="video/*" @change="(env) => selectVideoFile(env)"/>
            </label>
            <small>{{ store.videoObj.name }}</small>
        </div>
    </div>
</template>

<style scoped>
.vid-upload-holder{
    height: calc(100vh - 40px);
    position: relative;
    margin: 20px;
}
#vid-bg {
    height: 100%;
    width: 100%;
    border-radius: 15px;
    position: absolute;
    object-fit: cover;
    z-index: -1;
}
.vid-upload-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1vh 2vw;
}
.vid-icon-holder {
  height: 10vh;
  width: 10vw;
  display: inherit;
  justify-content: center;
  margin-bottom: 2%;
}
.vid-icon {
  height: 100%;
  scale: 1.2;
}
/* .vid-upload-icon {
    max-width: 200px;
    width: 30vw;
    margin: 2%;
} */
.vid-upload-btn {
    max-width: 240px;
    width: 40vw;
    margin: 2%;
    background-color: var(--secondary);
    color: var(--tg-theme-button-text-color);
    font-size: 2.5vmin;
}
.vid-upload-btn:hover, :not(.btn-check) + .vid-upload-btn:active {
    background-color: #242862;
    border-color: var(--tg-theme-secondary-bg-color);
    color: var(--tg-theme-button-text-colorr);
}
small {
    font-size: 1.5vmin;
}
input[type="file"] {
    display: none;
}
</style>