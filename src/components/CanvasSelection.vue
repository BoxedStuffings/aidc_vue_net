<script>
import { store } from '../Store.js'
import Navbar from './Navbar.vue'
import  Toolbar  from './Toolbar.vue'
import { fabric } from 'fabric'

export default {
  data() {
    return {
      store,
      wrapperHeight: 0,
      canvasHeight: 0,
      big: false
    }
  },

  components: {
    Toolbar,
    Navbar
  },

  methods: {
    // Function to update canvas dimensions
    updateCanvasDimensions() {
      const aspectRatio = 16 / 9;
      // Updating canvas-wrapper height on resize
      this.wrapperHeight = document.querySelector('.cs-holder').offsetHeight * 90/100
      
      // Get the available width and height
      const canvasWrapper = document.querySelector('.canvas-wrapper')
      const availableHeight = this.wrapperHeight
      const availableWidth = canvasWrapper.clientWidth

      // Values based on available space (Max size of canvas possible; scaling on width of viewport)
      let newHeight = availableWidth / aspectRatio - 30
      let newWidth = availableWidth - 30
      this.big = false

      // If canvas overlaps the toolbar; change canvas size to scale on available height
      if (newHeight >= availableHeight) {
        newHeight = availableHeight - 30
        newWidth = availableHeight * aspectRatio - 30
        this.big = true
      }
      this.canvasHeight = newHeight

      this.canvas.setWidth(newWidth);
      this.canvas.setHeight(newHeight);
      this.canvas.renderAll();
    }

  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton
    const rect = new fabric.Rect({
      width: 100, height: 200,
      fill: 'red',
      angle: 30
    })
    
    //Intialize Fabric.js Canvas
    this.canvas =  new fabric.Canvas('canvas',{
      backgroundColor: 'white',
      selectionColor: 'rgba(163, 180, 255, 0.59)',
      selectionLineWidth: 2,
    })
    this.canvas.add(rect)

    //Resize Canvas Dimensions
    this.updateCanvasDimensions()
    window.addEventListener('resize', this.updateCanvasDimensions)

    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    })

    Telegram.WebApp.expand()
  }

}
</script>

<template>
  <div class="cs-holder">
    <div class="navbar-wrapper">
      <navbar class="navbar"></navbar>
    </div>
    <div class="canvas-wrapper">
      <canvas id="canvas"></canvas>
    </div>
    <h4 :style="{'z-index': 2, 'position': 'absolute'}">WrapperHeight: {{ wrapperHeight }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '5%'}">CanvasHeight: {{ canvasHeight }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '10%'}">ToolBarHeight: {{ wrapperHeight/90*100 }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '15%'}">CanvasLarger?: {{ big }}</h4>
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
.navbar-wrapper{
  display: flex;
  justify-content: center;
  height: 5%;
  min-height: 10px;
  max-height: 50px;
}
.navbar{
  width: 40%;
  min-width: 200px;
  max-width: 400px;
  position: absolute;
  
}

.canvas-wrapper{
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgrey;
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