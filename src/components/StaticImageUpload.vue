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
      img: Object
    }
  },

  watch: {
    img() {
      (store.imageObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }
  },

  methods: {
    selectImageFile(fileEvent) {
      let image = fileEvent.target.files[0]

      console.log(image.type)
      image.type.indexOf('image/') !== 0 ? this.pushToast() : store.uploadImage(image)

      if (store.imageObj instanceof File && image.type.indexOf('image/') == 0) {
        let bg = this.$refs.siuHolder
        this.img = URL.createObjectURL(store.imageObj)
        bg.src = this.img
        bg.style.visibility = 'visible'
        // bg.src = `url(${this.img})`
      }
    },

    pushToast() {
      this.toast.error('Invalid Image', {
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

  },

  beforeMount() {
    const mainButton = () => {
      store.setMediaType('Image')
      Telegram.WebApp.offEvent('backButtonClicked', backButton)
      this.telegramMainButton.hide()
      this.$router.push('/ScheduleSelection')
    }

    const backButton = () => {
      store.clearImage()
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
    this.telegramBackButton.show()

    if (store.imageObj instanceof File) {
      let bg = this.$refs.siuHolder
      this.img = URL.createObjectURL(store.imageObj)

      bg.src = this.img
      bg.style.visibility = 'visible'
    }
  }

}
</script>

<template>
  <div class="img-upload-holder">
    <div class="img-upload-content">
      <img ref="siuHolder" class="img-upload-preview noselect">
      {{ `url('src/assets/icons/${store.telegramColorScheme}/upload.svg')` }}
      <div class="img-icon-holder"><span :style="{'background': `url('src/assets/icons/${store.telegramColorScheme}/upload.svg')`, 'background-repeat':'no-repeat', 'background-size':'70px' , 'background-position':'center'}" class='icon1'></span></div>
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
.img-icon {
  height: 100%;
  scale: 1.2;
}
.img-upload-preview {
  height: 48%;
  width: 85%;
  margin: 2%;
  transform: translateY(-8%);
  visibility: hidden;
}
.img-upload-btn {
  max-width: 240px;
  width: 40vw;
  margin:1%;
  background-color: var(--secondary);
  font-size: 2.5vmin;
  /* pointer-events: none; */
}
.img-upload-btn:hover, :not(.btn-check) + .img-upload-btn:active {
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