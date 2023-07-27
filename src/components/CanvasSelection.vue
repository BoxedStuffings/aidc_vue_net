<script>
import $ from 'jquery'
import { store } from '../Store.js'
import Navbar from './Navbar.vue'
import Toolbar from './Toolbar.vue'
import { fabric } from 'fabric'
import { toRaw, ref, provide } from 'vue';

export default {
  provide() {
    return {
      ActiveColor: () => this.activeColor,
      BackgroundColor: () => this.backgroundColor
    }
  },

  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      telegramBackButton: Telegram.WebApp.BackButton,
      wrapperHeight: 0,
      isBottomSheetOpened: false,
      canvasHeight: 0, // Original Canvas Height  
      canvasWidth: 0, // Original Canvas Width 
      canvasLeft: 0, // Original Canvas Left  
      canvasTop: 0, // Original Canvas Top  
      scale: 1, // Zoom In, Out Scale
      clientX: 0,
      clientY: 0,
      activeColor: String,
      backgroundColor: String
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
      } else {
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
        })
      } else {
        this.canvas.selection = false
        this.canvas.forEachObject((obj) => {
          obj.set({
            selectable: false,
            evented: false
          })
        })
      }
    },

    selectOffCanvas(env) {
      if (!env.srcElement.classList.contains('upper-canvas')) {
        this.canvas.discardActiveObject()
        this.$refs.toolbar.editableTextboxSelected(0)
        this.$refs.toolbar.closeBottomSheet()
      }
    },

    canvasObjectSelection() {
      this.canvas.on('selection:created', () => this.textboxSelectionCheck(true))
      this.canvas.on('selection:updated', () => this.textboxSelectionCheck(false))
      this.canvas.on('selection:cleared', () => { this.$refs.toolbar.editableTextboxSelected(0), this.$refs.toolbar.closeBottomSheet() })
    },

    textboxSelectionCheck(state) {
      this.$refs.toolbar.closeBottomSheet()
      if (this.canvas.getActiveObject().type !== 'line') {
        this.activeColor = this.canvas.getActiveObject().fill
      } else {
        this.activeColor = this.canvas.getActiveObject().stroke
        console.log(this.canvas.getActiveObject())
      }
      if (this.canvas.getActiveObject().type === 'textbox') {
        this.$refs.toolbar.editableTextboxSelected(2)
        // No idea why it works without this part now, leaving it in just in case
        // this.fitCanvasToBottomSheet(false)
        // if (state) {
        //   this.fitCanvasToBottomSheet(false)
        // } else {
        //   // this.activeColor += 'h'
        // }
      } else {
        this.$refs.toolbar.editableTextboxSelected(1)
      }
    },

    //Delete Selected Elements
    deleteSelection() {
      const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"
      const deleteImg = document.createElement('img')
      deleteImg.src = deleteIcon

      const deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -15,
        offsetX: 15,
        cursorStyle: 'pointer',
        mouseUpHandler: (eventData, transform) => this.deleteObject(eventData, transform),
        render: this.renderIcon(deleteImg),
        cornerSize: 24
      })
      fabric.Object.prototype.controls.deleteControl = deleteControl
      fabric.Textbox.prototype.controls.deleteControl = deleteControl
    },

    deleteObject(eventData, transform) {
      var target = transform.target
      var canvas = target.canvas
      canvas.remove(target)
      store.removeElementFromCanvas(target)
      canvas.requestRenderAll()
    },

    renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize
        ctx.save()
        ctx.translate(left, top)
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
        ctx.drawImage(icon, -size / 2, -size / 2, size, size)
        ctx.restore()
      }
    },

    // Move canvas to fit bottom sheet on screen
    fitCanvasToBottomSheet(state) {
      this.isBottomSheetOpened = state
      this.updateCanvasDimensions()
    },

    editCanvasObject(element, movement, direction, layerArray) {
      if (direction) {
        for (let x = 0; x < movement; x++) {
          this.canvas.bringForward(toRaw(element))
        }
      } else {
        for (let x = 0; x < movement; x++) {
          this.canvas.sendBackwards(toRaw(element))
        }
      }

      this.canvas.requestRenderAll()
      store.setCanvasLayer(layerArray)
    },

    loadTemplate(json) {
      console.log(this.scale);
      this.canvas.loadFromJSON(json);
      store.removeallElementsFromCanvas()
      this.$refs.toolbar.closeBottomSheet()
      var scaleX = 0
      var scaleY = 0
      setTimeout(() => {
        this.canvas.getObjects().forEach((obj) => {
          if (obj.id == 'Background') {

            scaleX = this.scale/ obj.scaleX
            scaleY = this.scale / obj.scaleY
            console.log("canvas scale: " + this.scale)
            console.log("old scale: " + obj.scaleX + " " + obj.scaleY)
            console.log("new scale: " + scaleX + " " + scaleY)
            return
          }
        })
        this.canvas.getObjects().forEach((obj) => {
          if (obj.id != 'Background') {
            console.log("not Background")
            obj.left *= scaleX
            obj.top *= scaleY
            obj.scaleX *= scaleX
            obj.scaleY *= scaleY
            obj.setCoords()
          }
          else {
            obj.set('selectable', true)
            obj.set('top', 0)
            obj.set('left', 0)
            obj.scaleToHeight(this.canvas.height)
            obj.scaleToWidth(this.canvas.width)
            obj.selectable = false
            obj.evented = false
          }
          this.canvas.renderAll()
        })
      }, 500)
      setTimeout(() => {
        const objects = this.canvas.getObjects()
        for (let o in objects) {
          store.addElementToCanvas(objects[o])
        }
      }, 500)
    },

    insertElementToCanvas(element) {
      let uid = store.createElementID(element)
      element.set({
        top: this.canvas.height / 3,
        left: this.canvas.width / 2,
        id: uid
      })
      store.addElementToCanvas(element)
      this.canvas.add(element)
    },

    insertImageToCanvas(imageObj) {
      let uid = store.createElementID(imageObj)
      imageObj.set({
        top: this.canvas.height / 3,
        left: this.canvas.width / 2.5,
        id: uid
      }).setSrc(imageObj._element.src, () => this.canvas.renderAll(), { 'crossOrigin': 'anonymous' })
      imageObj.scaleToWidth(this.canvas.width / 5, false);
      store.addElementToCanvas(imageObj)
      this.canvas.add(imageObj)
    },

    setFontFamily(font) {
      this.canvas.getActiveObject().set('fontFamily', font)
      this.canvas.requestRenderAll()
    },

    changeFont(fontsize) {
      this.canvas.getActiveObject().set('fontSize', fontsize)
      this.canvas.requestRenderAll()
    },

    setAlignment(alignment) {
      this.canvas.getActiveObject().set('textAlign', alignment)
      this.canvas.requestRenderAll()
    },

    toggleFontWeight() {
      let fontWeight = this.canvas.getActiveObject().get('fontWeight')
      fontWeight === 'bold' ? this.canvas.getActiveObject().set('fontWeight', 'normal') : this.canvas.getActiveObject().set('fontWeight', 'bold')
      this.canvas.requestRenderAll()
    },

    toggleItalics() {
      let fontStyle = this.canvas.getActiveObject().get('fontStyle')
      fontStyle === 'italic' ? this.canvas.getActiveObject().set('fontStyle', 'normal') : this.canvas.getActiveObject().set('fontStyle', 'italic')
      this.canvas.requestRenderAll()
    },

    toggleLinethrough() {
      let linethrough = this.canvas.getActiveObject().get('linethrough')
      linethrough ? this.canvas.getActiveObject().set('linethrough', false) : this.canvas.getActiveObject().set('linethrough', true)
      this.canvas.requestRenderAll()
    },

    toggleUnderline() {
      let underline = this.canvas.getActiveObject().get('underline')
      underline ? this.canvas.getActiveObject().set('underline', false) : this.canvas.getActiveObject().set('underline', true)
      this.canvas.requestRenderAll()
    },

    changeColor(color) {
      try {
        if (this.canvas.getActiveObject().type !== 'line') {
          this.canvas.getActiveObject().set('fill', color)
        } else {
          this.canvas.getActiveObject().set('stroke', color)
        }
        this.canvas.requestRenderAll()
      } catch (e) {

      }
    },

    changeCanvasColor(color) {
      try {
        this.canvas.set('backgroundColor', color)
        this.canvas.requestRenderAll()
        this.backgroundColor = this.canvas.backgroundColor
      } catch (e) {

      }
    },

    //Saving of Canvas
    saveCanvas(value) {
      var dataURL;
      if (value != 'json') { //Downloads Image : PNG/JPEG/SVG/JSON
        dataURL = canvas.toDataURL({
          format: value,
          quality: 0.8, // 1 represents the highest quality (optional)
        })
      }
      else { // Downloads JSON
        const json = this.canvas.toObject(['id'])
        const jsonString = JSON.stringify(json)
        const dataBlob = new Blob([jsonString], { type: 'application/json' })
        dataURL = URL.createObjectURL(dataBlob)
      }
      const downloadLink = document.createElement('a')
      downloadLink.href = dataURL
      downloadLink.download = 'canvas.' + value
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    },

    //Template upload test
    jsonTemplate(json) {
      this.canvas.loadFromJSON(json, this.canvas.renderAll.bind(this.canvas));
      const objects = this.canvas.getObjects()
      for (let o in objects) {
        store.addElementToCanvas(objects[o])
      }
    },

    async getTemplates() {
      await $.ajax({
        headers: { 'Authorization': 'Bearer 64a6f463632f4066200cc0e5|lu6CIFXUEWudouVhWcoch656JK9mO0F0Kjc3liYX' }, //tbr
        url: 'https://heehee.amphibistudio.sg/api/templates',
        method: 'GET',
        success: (obj) => {
          console.log(obj.data)
          store.initCanvasTemplates(obj.data)
        },
        error: (error) => console.log(error)
      })
    }
    
  },

  beforeMount() {
    const mainButton = () => {
      store.setMediaType('Canvas')
      let dataURL = this.canvas.toDataURL()
      let blob = new Blob([dataURL], {type: "octet/stream"})
      let file = new File([blob], 'AIDC_Canvas')
      store.uploadCanvas(file)
      Telegram.WebApp.offEvent('backButtonClicked', backButton)
      this.telegramMainButton.hide()
      this.$router.push('/ScheduleSelection')
    }

    const backButton = () => {
      Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
      Telegram.WebApp.offEvent('backButtonClicked', backButton)
      this.telegramMainButton.hide()
      this.$router.go(-1)
    }

    this.telegramMainButton.setParams({ text: 'Next' })
    Telegram.WebApp.onEvent('mainButtonClicked', mainButton)
    
    Telegram.WebApp.onEvent('backButtonClicked', backButton)
  },

  mounted() {
    this.telegramMainButton.show()
    this.telegramBackButton.show()
    Telegram.WebApp.expand()

    // Intialize Fabric.js Canvas
    this.backgroundColor = '#FFFFFF'
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: this.backgroundColor,
      selectionColor: 'rgba(163, 180, 255, 0.59)',
      selectionLineWidth: 2
    })

    this.canvas.backgroundImage

    // Resize Canvas Dimensions
    this.updateCanvasDimensions()
    window.addEventListener('resize', this.updateCanvasDimensions)

    // Check for object selection in canvas
    this.canvasObjectSelection()

    //Add custom delete control
    this.deleteSelection()

    // Get canvas templates
    this.getTemplates()
  }

}
</script>

<template>
  <div class="cs-holder">
    <navbar class="navbar-wrapper"></navbar>
    <div @click="(env) => selectOffCanvas(env)" class="canvas-wrapper" ref="canvasWrapper"
      :style="{ 'height': `${wrapperHeight}px` }">
      <canvas id="canvas" ref="canvasElement"></canvas>
      <button @click="test">test</button>
    </div>
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
  z-index: 0;
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