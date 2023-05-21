<script>
import { store } from '../Store.js'
import  Toolbar  from './Toolbar.vue'
import { fabric } from 'fabric'

export default {
  data() {
    return {
      store,
      wrapperHeight: ''
    }
  },

  components: {
    Toolbar
  },

  methods: {
    // Function to update canvas dimensions
     updateCanvasDimensions() {
      const aspectRatio = 16 / 9;
      this.wrapperHeight = String(document.querySelector('.cs-holder').offsetHeight * 90/100)
      
      // Get the available width and height
      const canvasWrapper = document.querySelector('.canvas-wrapper')
      const availableHeight = this.wrapperHeight
      const availableWidth = canvasWrapper.clientWidth
      let newHeight = availableWidth / aspectRatio - 30
      let newWidth = availableWidth - 30

      if (newHeight >= availableHeight) {
        newHeight = availableHeight - 30
        newWidth = availableHeight * aspectRatio - 30 
      }

      this.canvas.setWidth(newWidth);
      this.canvas.setHeight(newHeight);
      this.canvas.renderAll();
    }

  },

  mounted() {
    Telegram.WebApp.expand()
    
    //Intialize Fabric.js Canvas
    this.canvas =  new fabric.Canvas('canvas',{
      backgroundColor: 'white',
      selectionColor: 'rgba(163, 180, 255, 0.59)',
      selectionLineWidth: 2,
    })

    const rect = new fabric.Rect({
      width: 100, height: 200,
      fill: 'red',
      angle: 30
    })

    this.canvas.add(rect)

    //Resize Canvas Dimensions
    this.updateCanvasDimensions()

    window.addEventListener('resize', this.updateCanvasDimensions)

    // Telegram API
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
  <div class="cs-holder">
    <div class="canvas-wrapper" :style="{'height' : `${wrapperHeight}px`}">
      <canvas id="canvas"></canvas>
    </div>
    <toolbar class="toolbar"></toolbar>
  </div>
</template>

<style scoped>
.cs-holder {
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  position: relative;
  background: lightgrey;
}
.canvas-wrapper{
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toolbar {
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0;
  border: 1px solid black;
  padding-block: 1vh;
}
</style>