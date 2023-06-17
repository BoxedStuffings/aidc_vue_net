<script>
import $ from 'jquery'
import { store } from '../Store.js'

export default {
  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton
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
        let img = URL.createObjectURL(store.imageObj)

        bg.style.backgroundImage = `url(${img})`
        this.mainButtonVisibility()
      }
    },

    async test() {
      if (store.imageObj instanceof File) {
        let form_data = new FormData()
        form_data.append('file', store.imageObj)
        
        await $.ajax({
        url: 'https://heehee.amphibistudio.sg/api/save/image',
          method: 'POST',
          headers: {
            'Authorization' : 'Bearer ' + '648dbe64b1981ef0c4039be2|fxfgCqI8o9eig8ABkMR0ES7isHzGr5MCh4L74T49'
          },
          processData: false,
          mimeType: 'multipart/form-data',
          contentType: false,
          data: form_data,
          success: (obj) => {
            obj = JSON.parse(obj),
            console.log(obj.message),
            store.setMediaUploadLink(obj.data)
          },
          error: (error) => console.log(error)
        })
      }
    },

    mainButtonVisibility() {
      // (store.imageObj instanceof File) ? console.log("open") : console.log("close")
      (store.imageObj instanceof File) ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }

  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton

    let imageUploadTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.$router.push('/ScheduleSelection')
        this.telegramMainButton.offClick(imageUploadTelegramButton)
        this.telegramMainButton.hide()
      }
    }
    
    this.telegramMainButton.setParams({
      text: 'Next',
    }).onClick(imageUploadTelegramButton)

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
    <div ref="siuHolder" class="img-upload-holder">
      <button @click="test">test</button>
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