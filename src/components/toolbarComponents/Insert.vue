<script>
import { store } from '../../Store.js'
import { fabric } from 'fabric'

export default {
  data() {
    return {
      store,
      imageCount: 0
    }
  },

  methods: {
    selectImageFile(fileEvent) {
      let image = fileEvent.target.files[0]
      console.log(image.type)

      if (image.type.indexOf('image/') !== 0) {
        console.log('invalid image')
      } else {
        if (image instanceof File && image.type.indexOf('image/') == 0) {
        let imageURL = URL.createObjectURL(image)
        this.createImageObject(imageURL)
        }
      }
    },

    createImageObject(imageURL) {
      fabric.Image.fromURL(imageURL, (imageObj) => this.insertImageObjectToCanvas(imageObj))
      this.$refs.canvasInsertInput.value = null
    },

    insertImageObjectToCanvas(imageObj) {
      this.$parent.$parent.$parent.insertImageToCanvas(imageObj)
    },

    colorTheme() {
      let icon = document.getElementsByClassName('upload')
      console.log(icon)
      if (store.telegramColorScheme == 'light') {
        icon[0].classList.add('light-upload')
      } else {
        icon[0].classList.add('dark-upload')
      }
    }

  },

  mounted() {
    this.colorTheme()
  }

}
</script>

<template>
  <div class="canvas-img-insert-holder">
    <div class="canvas-img-insert-content">
      <span class='upload'></span>
        <label class="btn btn-primary canvas-img-insert-btn">
          Choose Image
          <input ref="canvasInsertInput" type="file" accept="image/*" @change="(env) => selectImageFile(env)"/>
        </label>
    </div>
  </div>
</template>

<style scoped>
.canvas-img-insert-holder{
  height: 100%;
  background-color: var(--tg-theme-bg-color);
}
.canvas-img-insert-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3vh;
}
.canvas-img-insert-icon {
  max-width: 100px;
  width: 30vw;
  margin: 1%;
}
.canvas-img-insert-btn {
  max-width: 240px;
  width: 40vw;
  margin: 1%;
  background-color: var(--secondary);
  color: var(--tg-theme-button-text-color);
  font-size: 2.5vmin;
}
.canvas-img-insert-btn:hover, :not(.btn-check) + .canvas-img-insert-btn:active {
  background-color: #242862;
  border-color: var(--tg-theme-secondary-bg-color);
  color: var(--tg-theme-button-text-colorr);
}
input[type="file"] {
  display: none;
}
.upload {
  height: 70px;
  width: 70px;
  margin:0;
  display: block;
}
</style>