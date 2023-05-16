<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
      // Data received -- test values from store
      store,
      vid: Object
    }
  },

  methods: {
    selectVideoFile(fileEvent) {
        let video = fileEvent.target.files[0]

        video.type.indexOf('video/') !== 0 ? console.log('invalid video') : store.uploadVideo(video)

        // test
        if (store.videoObj instanceof File && video.type.indexOf('video/') == 0) {          
          this.vid = URL.createObjectURL(store.videoObj)
        }

    },
  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton

    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    })
  }

}
</script>

<template>
    <div class="vid-upload-holder">
        <video autoplay muted loop playsinline id="vid-bg" :src="vid"></video>
        <div class="vid-upload-content">
            <img class="vid-upload-icon noselect" src="../assets/boxedstuffings.png">
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
.vid-upload-icon {
    max-width: 200px;
    width: 30vw;
    margin: 2%;
}
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