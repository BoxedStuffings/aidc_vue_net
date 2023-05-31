<script>
import { V_ON_WITH_MODIFIERS } from '@vue/compiler-dom'
import { store } from '../Store.js'
import Navbar from './Navbar.vue'
import Toolbar from './Toolbar.vue'
import { fabric } from 'fabric'

export default {
  data() {
    return {
      store,
      wrapperHeight: 0,
      isBottomSheetOpened: false,
      canvasHeight: 0, // Original Canvas Height  
      canvasWidth: 0, // Original Canvas Width 
      canvasLeft: 0, // Original Canvas Left  
      canvasTop: 0, // Original Canvas Top  
      scale: 1, // Zoom In, Out Scale
      clientX: 0,
      clientY: 0,
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

      this.isBottomSheetOpened ? canvasOffset = 66 / 100 : canvasOffset = 90 / 100

      // Updating canvas-wrapper height on resize
      this.wrapperHeight = document.querySelector('.cs-holder').offsetHeight * canvasOffset

      // Get the available width and height
      const canvasWrapper = document.querySelector('.canvas-wrapper')
      const availableHeight = this.wrapperHeight
      const availableWidth = canvasWrapper.clientWidth

      // Values based on available space (Max size of canvas possible; scaling on width of viewport)
      let newHeight = availableWidth / aspectRatio - 30
      let newWidth = availableWidth - 30

      // If canvas overlaps the toolbar; change canvas size to scale on available height
      if (newHeight >= availableHeight) {
        newHeight = availableHeight - 30
        newWidth = availableHeight * aspectRatio - 30
      }

      // Updating values with current H&W
      this.canvasHeight = newHeight
      this.canvasWidth = newWidth
      this.canvasLeft = '0px'
      this.canvasTop = '0px'

      this.canvas.setWidth(this.canvasWidth)
      this.canvas.setHeight(this.canvasHeight)
      this.canvas.renderAll()
    },

    // Navbar functions  
    ZoomInOutCanvas(option) {
      if (option == 0) { // Zoom In
        if (this.scale + 0.1 < 1.4) {
          this.scale = this.scale + 0.1
        }
      }
      else if (option == 1) { // Zoom Out
        if (this.scale - 0.1 > 0.2) {
          this.scale = this.scale - 0.1
        }
      } else { // Fit to Screen
        this.scale = 1
        this.$refs.canvasElement.style.left = this.canvasLeft
        this.$refs.canvasElement.style.top = this.canvasTop
      }

      // scaling objects in canvas down
      this.canvas.setZoom(this.scale)

      // scaling canvas dimension down
      this.canvas.setHeight(this.canvasHeight * this.scale)
      this.canvas.setWidth(this.canvasWidth * this.scale)
    },

    GrabCanvas(status) {
      // Clicked 
      if (status) {
        this.canvas.defaultCursor = 'move'
        this.isDragging = false
        this.selection = false

        // PC
        this.canvas.on('mouse:down', this.canvasDragStart)
        this.canvas.on('mouse:move', this.canvasDragMove)
        this.canvas.on('mouse:up', this.canvasDragEnd)

        // Mobile
        this.canvas.on('touch:down', this.canvasDragStart)
        this.canvas.on('touch:move', this.canvasDragMove)
        this.canvas.on('touch:end', this.canvasDragEnd)
      }
      else {
        // Unclicked
        this.canvas.off('mouse:down')
        this.canvas.off('mouse:move')
        this.canvas.off('mouse:up')
        this.canvas.off('touch:down')
        this.canvas.off('touch:move')
        this.canvas.off('touch:end')

        this.canvas.defaultCursor = 'default'
        this.isDragging = false
        this.CanvasSelection(true)
      }
    },

    // Handle interaction start (mouse down / touch start)
    canvasDragStart(opt) {
      var evt = opt.e
      this.isDragging = true
      this.CanvasSelection(false)
      this.getClientXandY(evt)
      this.lastPosX = this.clientX
      this.lastPosY = this.clientY
    },

    // Handle interaction move (mouse move / touch move)
    canvasDragMove(opt) {
      if (this.isDragging) {
        var e = opt.e
        this.getClientXandY(e)

        // Moves actual canvas position
        const canvasElement = this.$refs.canvasElement
        const currentLeft = parseInt(canvasElement.style.left) || 0
        const currentTop = parseInt(canvasElement.style.top) || 0
        canvasElement.style.left = currentLeft + (this.clientX - this.lastPosX) + 'px'
        canvasElement.style.top = currentTop + (this.clientY - this.lastPosY) + 'px'

        this.lastPosX = this.clientX
        this.lastPosY = this.clientY

      }
    },

    // Handle interaction end (mouse up / touch end)
    canvasDragEnd(opt) {
      this.isDragging = false
      this.CanvasSelection(true)
    },

    getClientXandY(e) {
      // Touch events dont have client x and y
      if (e.clientX != null) {
        this.clientX = e.clientX
        this.clientY = e.clientY
      }
      else {
        var touch = e.touches[0]
        this.clientX = touch.pageX
        this.clientY = touch.pageY
      }
    },

    // Reuse this code multiple times
    CanvasSelection(status) {
      if (status) {
        this.canvas.selection = true
        this.canvas.forEachObject((obj) => {
          obj.set({
            selectable: true,
            evented: true
          })
        });
      }
      else {
        this.canvas.selection = false
        this.canvas.forEachObject((obj) => {
          obj.set({
            selectable: false,
            evented: false
          })
        });
      }

    },

    canvasObjectSelection() {
      this.canvas.on("selection:created", () => this.textboxSelectionCheck()),
      this.canvas.on("selection:updated", () => this.textboxSelectionCheck())
    },

    textboxSelectionCheck() {
      if (this.canvas.getActiveObject().type === 'textbox') {
        this.$refs.toolbar.selectToolbarOption({ _id: 9, name: "font"}) 
      }
    },

    // Resize canvas to fit bottom sheet on screen
    fitCanvasToBottomSheet(state) {
      this.isBottomSheetOpened = state
      this.updateCanvasDimensions()
    },

    insertElementToCanvas(element) {
      this.canvas.add(element)
    },

    insertImageToCanvas(imageObj) {
      imageObj.scaleToWidth(this.canvas.width/5, false);
      this.canvas.add(imageObj)
    }
    
  },

  mounted() {
    const telegramBackButton = Telegram.WebApp.BackButton

    // Intialize Fabric.js Canvas
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      selectionColor: 'rgba(163, 180, 255, 0.59)',
      selectionLineWidth: 2
    })

    // Resize Canvas Dimensions
    this.updateCanvasDimensions()
    window.addEventListener('resize', this.updateCanvasDimensions)

    // Check for object selection in canvas
    this.canvasObjectSelection()

    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    })

    Telegram.WebApp.expand()
  },

}
</script>

<template>
  <div class="cs-holder">
    <navbar class="navbar-wrapper"></navbar>
    <div class="canvas-wrapper" :style="{ 'height': `${wrapperHeight}px` }">
      <canvas id="canvas" ref="canvasElement"></canvas>
    </div>

    <!-- TBR -->
    <h4 :style="{ 'z-index': 2, 'position': 'absolute', 'top': '10%' }">QueryID: {{ store.telegramWebAppInfo.query_id }}</h4>
    <!-- <h4 :style="{'z-index': 2, 'position': 'absolute', 'top': '20%'}">UserID: {{ store.telegramWebAppInfo.user.id }}</h4> -->
    <!-- <h4 :style="{ 'z-index': 2, 'position': 'absolute', 'top': '30%' }">UserObject: {{ store.telegramWebAppInfo }}</h4> -->
    <!-- TBR -->

    <toolbar ref="toolbar" class="toolbar"></toolbar>
  </div>
</template>

<style scoped>
.cs-holder {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  position: relative;
  background: lightgrey;
  overflow: hidden;
}
.navbar-wrapper {
  height: 5%;
  min-height: 10px;
  max-height: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 3;
}
.canvas-wrapper {
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
h4 {
  color: black !important;
}
</style>