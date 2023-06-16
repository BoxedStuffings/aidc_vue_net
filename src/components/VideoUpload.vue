<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
      store,
      vid: Object,
      telegramMainButton: Telegram.WebApp.MainButton
    }
  },

  methods: {
    selectVideoFile(fileEvent) {
      let video = fileEvent.target.files[0]

      video.type.indexOf('video/') !== 0 ? console.log('invalid video') : store.uploadVideo(video)

      // test
      if (store.videoObj instanceof File && video.type.indexOf('video/') == 0) {          
        this.vid = URL.createObjectURL(store.videoObj)
        this.mainButtonVisibility()
      }

    },

    mainButtonVisibility() {
      // (store.videoObj instanceof File) ? console.log("open") : console.log("close")
      (store.imageObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }

  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton
    
    let vidUploadTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.$router.push('/ScheduleSelection')
        this.telegramMainButton.offClick(vidUploadTelegramButton)
        this.telegramMainButton.hide()
      }
    }
    
    this.telegramMainButton.setParams({
      text: 'Next',
    }).onClick(vidUploadTelegramButton)

    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    })

    this.mainButtonVisibility()
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