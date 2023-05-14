<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
      // Data received -- test values from store
      store,
    }
  },

  methods: {
    selectImageFile(fileEvent) {
        const image = fileEvent.target.files[0]
        image.type.indexOf('image/') !== 0 ? console.log("invalid image") : store.uploadImage(image)
    },
  },

  mounted() {
    Telegram.WebApp.BackButton.show()
    Telegram.WebApp.BackButton.onClick(() => {
      if (Telegram.WebApp.BackButton.isVisible) {
        this.$router.go(-1)
        Telegram.WebApp.BackButton.hide()
      }
    })
  }

}
</script>

<template>
    <div class="img-upload-holder">
        <div class="img-upload-content">
            <img class="img-upload-icon" src="../assets/boxedstuffings.png">
            <label class="btn btn-primary img-upload-btn">
                Choose File
                <input type="file" accept="image/*" @change="(env) => selectImageFile(env)"/>
            </label>
            <small>{{ store.imageUpload.name }}</small>
        </div>
    </div>
</template>

<style scoped>
.img-upload-holder{
    height: 100vh;
}
.img-upload-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    border-color: var(--tg-theme-secondary-bg-color);
    background-color: #242862;
    color: var(--tg-theme-button-text-colorr);
}

small {
    font-size: 1.5vmin;
}

input[type="file"] {
    display: none;
}

</style>