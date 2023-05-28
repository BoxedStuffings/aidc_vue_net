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
      isBottomSheetOpened: false,
      canvasHeight: 0, //TBR
      big: false //TBR
    }
  },

  components: {
    Toolbar,
    Navbar
  },

  methods: {
    // Function to update canvas dimensions
    updateCanvasDimensions() {
      const aspectRatio = 16 / 9
      let canvasOffset = 0

      this.isBottomSheetOpened ? canvasOffset = 66/100 : canvasOffset = 90/100

      // Updating canvas-wrapper height on resize
      this.wrapperHeight = document.querySelector('.cs-holder').offsetHeight * canvasOffset

      // Get the available width and height
      const canvasWrapper = document.querySelector('.canvas-wrapper')
      const availableHeight = this.wrapperHeight
      const availableWidth = canvasWrapper.clientWidth

      // Values based on available space (Max size of canvas possible; scaling on width of viewport)
      let newHeight = availableWidth / aspectRatio - 30
      let newWidth = availableWidth - 30
      this.big = false //TBR

      // If canvas overlaps the toolbar; change canvas size to scale on available height
      if (newHeight >= availableHeight) {
        newHeight = availableHeight - 30
        newWidth = availableHeight * aspectRatio - 30
        this.big = true //TBR
      }
      this.canvasHeight = newHeight //TBR

      this.canvas.setWidth(newWidth);
      this.canvas.setHeight(newHeight);
      this.canvas.renderAll();
    },

    fitCanvasToBottomSheet(state) {
      this.isBottomSheetOpened = state
      this.updateCanvasDimensions()
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
      selectionLineWidth: 2
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
    <navbar class="navbar-wrapper"></navbar>
    <div class="canvas-wrapper" :style="{'height' : `${wrapperHeight}px`}">
      <canvas id="canvas"></canvas>
    </div>

    <!-- TBR -->
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '10%'}">WrapperHeight: {{ wrapperHeight }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '15%'}">CanvasHeight: {{ canvasHeight }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '20%'}">ToolBarHeight: {{ wrapperHeight/90*100 }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '25%'}">CanvasLarger?: {{ big }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '30%'}">QueryID: {{ store.telegramWebAppInfo.query_id }}</h4>
    <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '35%'}">UserID: {{ store.telegramWebAppInfo.user.id }}</h4>

    <!-- TBR -->

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
  height: 5%;
  min-height: 10px;
  max-height: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 3;
}
.canvas-wrapper{
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgrey;
  transition-duration: .2s;
}
.toolbar {
  height: 10%;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-block: 1vh;
}
h4{
  color: black !important;
}
</style>