<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      telegramBackButton: Telegram.WebApp.BackButton,
      img: Object
    }
  },

  watch: {
    img() {
      // (store.imageObj instanceof File) ? console.log("open") : console.log("close")
      (store.imageObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }
  },

  methods: {
    selectImageFile(fileEvent) {
      let image = fileEvent.target.files[0]

      console.log(image.type)
      image.type.indexOf('image/') !== 0 ? console.log('invalid image') : store.uploadImage(image)

      // test
      if (store.imageObj instanceof File && image.type.indexOf('image/') == 0) {
        let bg = this.$refs.siuHolder
        this.img = URL.createObjectURL(store.imageObj)

        bg.style.backgroundImage = `url(${img})`
      }
    }

  },

  mounted() {
    if (store.imageObj instanceof File) {
      let bg = this.$refs.siuHolder
      this.img = URL.createObjectURL(store.imageObj)

      bg.style.backgroundImage = `url(${img})`
    }

    this.telegramMainButton.setParams({ text: 'Next'})
    Telegram.WebApp.onEvent('mainButtonClicked', () => {
      this.telegramMainButton.hide(),
      store.setMediaType('Image'),
      this.$router.push('/ScheduleSelection')
    })

    this.telegramBackButton.show()
    Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.telegramMainButton.hide(),
      store.clearImage(),
      this.$router.go(-1)
    })

    // let imageUploadTelegramButton = () => {
    //   if (this.telegramMainButton.isVisible) {
    //     this.telegramMainButton.offClick(imageUploadTelegramButton)
    //     this.telegramBackButton.offClick(imageUploadBackButton)
    //     this.telegramMainButton.hide()
    //     store.setMediaType('Image')
    //     this.$router.push('/ScheduleSelection')
    //   }
    // }

    // let imageUploadBackButton = () => {
    //   if (this.telegramBackButton.isVisible) {
    //     this.telegramMainButton.offClick(imageUploadTelegramButton)
    //     this.telegramBackButton.offClick(imageUploadBackButton)
    //     this.telegramMainButton.hide()
    //     store.clearImage()
    //     this.$router.go(-1)
    //   }
    // }
    
    // this.telegramMainButton.setParams({
    //   text: 'Next',
    // }).onClick(imageUploadTelegramButton)

    // this.telegramBackButton.show()
    // this.telegramBackButton.onClick(imageUploadBackButton)

    // this.mainButtonVisibility()
  }

}
</script>

<template>
    <div ref="siuHolder" class="img-upload-holder">
      <button @click="this.$router.push('/ScheduleSelection')">test</button>
        <div class="img-upload-content">
            <!-- <img class="img-upload-icon noselect" src="../assets/boxedstuffings.png"> -->
            <div class="img-icon-holder"><font-awesome-icon icon="fa-solid fa-upload"  class="img-icon" /></div>
            <label class="btn btn-primary img-upload-btn">
                Choose File
                <input type="file" accept="image/*" @change="(env) => selectImageFile(env)"/>
            </label>
            <small>{{ store.imageObj.name }}</small>
        </div>
    </div>
</template>

<style scoped>
.img-upload-holder{
  height: calc(100vh - 40px);
  margin: 20px;
  border-radius: 15px;
  background-repeat: no-repeat;
  background-size: cover;
}
.img-upload-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vh 2vw;
}
.img-icon-holder {
  height: 10vh;
  width: 10vw;
  display: inherit;
  justify-content: center;
  margin-bottom: 2%;
}
.img-icon {
  height: 100%;
  scale: 1.2;
}
/* .img-upload-icon {
  max-width: 200px;
  width: 30vw;
  margin: 2%;
} */
.img-upload-btn {
  max-width: 240px;
  width: 40vw;
  margin: 2%;
  background-color: var(--secondary);
  color: var(--tg-theme-button-text-color);
  font-size: 2.5vmin;
}
.img-upload-btn:hover, :not(.btn-check) + .img-upload-btn:active {
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