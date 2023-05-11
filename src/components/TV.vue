<script>
import { onMounted, ref } from 'vue'

export default {
  data() {
    return {
      // Data to be sent
      selectedTvs: [],
      
      // Data recieved -- test values
      availableTVs: [
        { id: "1029B", text: 'TV Test 1'},
        { id: "1030A", text: 'TV Test 2'},
        { id: "1031C", text: 'TV Test 3'},
        { id: "1029D", text: 'TV Test 4'},
        { id: "1029E", text: 'TV Test 5'},
        { id: "1029F", text: 'TV Test 6'},
        { id: "1029G", text: 'TV Test 7'}
      ],
    }
  },

  methods: {
    selectTV(TV, buttonIndex) {
      const index = this.selectedTvs.findIndex(t => t == TV)
      const buttonID = "button_" + buttonIndex
      const tgMainButton = Telegram.WebApp.MainButton

      if (index >= 0) {
        this.selectedTvs.splice(index, 1)
        document.getElementById(buttonID).innerHTML = "Select"
      } else {
        this.selectedTvs.push(TV)
        document.getElementById(buttonID).innerHTML = "Unselect"
      }

      if (this.selectedTvs.length >= 1) { 
        console.log("test 1")
        tgMainButton.isActive = true
        tgMainButton.show()
      } else {
        console.log("test 2")
        tgMainButton.isActive = false
        tgMainButton.hide()
      }
    },
  },

  mounted() {
    Telegram.WebApp.MainButton.setParams({
      text: 'Select Tv',
      is_active: false
    })

    Telegram.WebApp.onEvent('mainButtonClicked', this.$router.push('/MainSelection'))
  }

}

// Telegram.WebApp.MainButton.onClick(this.$router.push('/MainSelection'))
</script>

<template>
    <!-- Main Grid -->
    <div id="Tv_Grid">
        <!-- Individual cards -->
        <ui class="card" v-for="(TV, index) in availableTVs" :key="index">
          <!-- Outline for selection -->
          <div class="imageOutline" :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }">
            <!-- Display image -->
            <img :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }" src="../assets/boxedstuffings.png">
          </div>
            <!-- Display name -->
            <p>TV • {{ TV.id }}</p>
            <button :id="'button_' + index" @click="selectTV(TV, index)">Selects</button>
        </ui> 
        {{ selectedTvs }}  <!-- for testing -->
    </div>
</template>

<style scoped>
#Tv_Grid {
  margin: 2vh 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  row-gap: 2vh;
  justify-items: center;
  box-sizing: border-box;
}
.card {
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imageOutline {
  max-width: 70%;
  height: auto;
}
.imageOutline.selected::before {
  content: "✓";
  background-color: grey;
  transform: scale(1);
}
.imageOutline::before {
  display: block;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}
.imageOutline img {
  max-width: 100%;
  height: auto;
}
img.selected {
  transform: scale(0.9);
  box-shadow: 0 0 4px white;
  z-index: -1;
}
.card button {
  background-color: #ff5081;
  width: 80%;
  padding: 5px 0;
  border: 0px;
  border-radius: 6px;
  color: white;
  text-align: center;
  justify-content: center;
  display: inline-block;
}

</style>