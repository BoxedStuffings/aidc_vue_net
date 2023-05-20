<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
      store,
    }
  },

  methods: {
    selectImageFile(fileEvent) {
        let image = fileEvent.target.files[0]

        console.log(image.type)
        image.type.indexOf('image/') !== 0 ? console.log('invalid image') : store.uploadImage(image)

        // test
        if (store.imageObj instanceof File && image.type.indexOf('image/') == 0) {
          let bg = document.getElementById('holder')
          let img = URL.createObjectURL(store.imageObj)

          bg.style.backgroundImage = `url(${img})`
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
    <div id="holder" class="img-upload-holder">
        <div class="img-upload-content">
            <img class="img-upload-icon noselect" src="../assets/boxedstuffings.png">
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
.img-upload-icon {
  max-width: 200px;
  width: 30vw;
  margin: 2%;
}
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