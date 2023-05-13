<script>
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
    selectTV(TV, Index) {
      const index = this.selectedTvs.findIndex(t => t == TV)
      const button = document.getElementById("button_" + Index)
      const tgMainButton = Telegram.WebApp.MainButton

      if (index >= 0) {
        this.selectedTvs.splice(index, 1)
        button.innerHTML = "Select"
      } else {
        this.selectedTvs.push(TV)
        button.innerHTML = "Unselect"
      }

      if (this.selectedTvs.length >= 1) { 
        tgMainButton.show()
      } else {
        tgMainButton.hide()
      }
    },

    pressingDown(index) {
        const card = document.getElementById("button_" + index)

        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(index) {
        const card = document.getElementById("button_" + index)

        card.style.transitionDuration = '0.2s'
        card.style.transform = 'scale(1)'
    }
  },

  mounted() {
    Telegram.WebApp.MainButton.setParams({
      text: 'Select Tv',
    }).onClick(() => {
      if (Telegram.WebApp.MainButton.isVisible) {
        this.$router.push('/MainSelection')
        Telegram.WebApp.MainButton.hide()
      }
    })
  }

}
</script>

<template>
    <!-- Main Grid -->
    <div id="tv-grid">
        <!-- Individual cards -->
        <ui class="tv-card noselect" v-for="(TV, index) in availableTVs" :key="index">
          <!-- Outline for selection -->
          <div class="tv-imageOutline" :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }">
            <!-- Card check mark -->
            <img class="tv-imageCheck" :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }" src="../assets/boxedstuffings.png">
            <!-- Display image -->
            <img :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }" src="../assets/boxedstuffings.png">
          </div>
            <!-- Display name -->
            <p>TV • {{ TV.id }}</p>
            <button :id="'button_' + index" @click="selectTV(TV, index)" @touchstart="pressingDown(index)" @touchend="notPressingDown(index)">Select</button>
        </ui> 
        {{ selectedTvs }}  <!-- for testing -->
    </div>
</template>

<style scoped>
#tv-grid {
  margin: 2vh 2vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  row-gap: 2vh;
  justify-items: center;
  box-sizing: border-box;
}
.tv-card {
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tv-imageOutline {
  max-width: 70%;
  height: auto;
  position: relative;
}
.tv-imageCheck.selected {
  visibility: visible;
  transform: scale(1);
  z-index: 2;
}
.tv-imageCheck {
  visibility: hidden;
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
  z-index: 2;
}
.tv-imageOutline img {
  max-width: 100%;
  height: auto;
}
img.selected {
  transform: scale(0.9);
  box-shadow: 0 0 4px white;
  z-index: -1;
}
.tv-card button {
  background-color: var(--accent);
  width: 80%;
  padding: 5px 0;
  border: 0px;
  border-radius: 6px;
  color: var(--tg-theme-text-color);
  text-align: center;
  justify-content: center;
  display: inline-block;
}
</style>