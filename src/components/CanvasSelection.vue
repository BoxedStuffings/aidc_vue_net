<script>
import { store } from '../Store.js'
import  Toolbar  from './Toolbar.vue'
import { fabric } from 'fabric'

export default {
  data() {
    return {
        store,
    }
  },
  components: {
    Toolbar,
  },

  methods: {
    // Function to update canvas dimensions
     updateCanvasDimensions() {
      const aspectRatio = 16 / 9;
      // Get the available width and height
      const availableWidth = window.innerWidth-30;
      const availableHeight = window.innerHeight-30;
      let newWidth = 1280;
      let newHeight = 720;
      // Update the canvas dimensions
      if(availableWidth < 1280){
        newWidth = availableWidth;
        newHeight = availableWidth/aspectRatio
      }
      this.canvas.setWidth(newWidth);
      this.canvas.setHeight(newHeight);
      this.canvas.renderAll();
    }
  },
  mounted() {
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
    });
    this.canvas.add(rect)
    //Resize Canvas Dimensions
    this.updateCanvasDimensions();
    window.addEventListener('resize',this.updateCanvasDimensions);

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
    <!-- Canvas -->
    <canvas id="canvas"></canvas>
    <!-- ToolBar -->
    <toolbar class="toolbar"/>
  </div>
</template>

<style scoped>
.cs-holder {
    height: 100vh;
    width: 100vw;
    position: relative;
    background: lightgrey;
    display:flex;
    justify-content: center;
    align-items: center;
}
canvas{
}
.toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid black;
    padding-block: 1vh;
}

</style>