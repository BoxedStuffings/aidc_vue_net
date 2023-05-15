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
    selectTV(TV, selection_id) {
      // const telegramMainButton = Telegram.WebApp.MainButton
      let index = store.findIndexOfSelectedTv(TV)
      let button = document.getElementById('button-id_' + selection_id)

      if (index >= 0) {
        store.spliceSelectedTvAt(index)
        button.innerHTML = 'Select'
      } else {
        store.pushSelectedTv(TV)
        button.innerHTML = 'Unselect'
      }

      // if (store.selectedTvs.length >= 1) { 
      //   telegramMainButton.show()
      // } else {
      //   telegramMainButton.hide()
      // }
    },

    pressingDown(selection_id) {
        let card = document.getElementById('button-id_' + selection_id)

        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_id) {
        let card = document.getElementById('button-id_' + selection_id)

        card.style.transform = 'scale(1)'
        card.style.transitionDuration = '0.2s'
    }
  },

  computed: {
    mainButtonVisibility() {
      const telegramMainButton = Telegram.WebApp.MainButton
      let isVisible = store.selectedTvs.length >= 1 ? True : false

      isVisible ? telegramMainButton.show() : telegramMainButton.hide()
      return isVisible
    }
  },

  mounted() {
    const telegramMainButton = Telegram.WebApp.MainButton

    telegramMainButton.setParams({
      text: 'Select Tv',
    }).onClick(() => {
      if (telegramMainButton.isVisible) {
        this.$router.push('/MainSelection')
        telegramMainButton.hide()
      }
    })
  }

}
</script>

<template>
    <!-- Main Grid -->
    <div id="tv-grid">
        <!-- Individual cards -->
        <ui class="tv-card noselect" v-for="TV in store.availableTVs" :key="TV._id">
          <!-- Outline for selection -->
          <div class="tv-card-imageOutline" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }">
            <!-- Card check mark -->
            <img class="tv-card-imageCheck" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" src="../assets/boxedstuffings.png">
            <!-- Display image -->
            <img :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" src="../assets/boxedstuffings.png">
          </div>
            <!-- Display name -->
            <p>TV • {{ TV._id }}</p>
            <button :id="'button-id_' + TV._id" @click="selectTV(TV, TV._id)" @touchstart="pressingDown(TV._id)" @touchend="notPressingDown(TV._id)">Select</button>
        </ui> 
        {{ store.selectedTvs }}  <!-- for testing -->
    </div>
</template>

<style scoped>
#tv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  row-gap: 2vh;
  justify-items: center;
  padding: 1vh 2vw;
  box-sizing: border-box;
}
.tv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
}
.tv-card-imageOutline {
  position: relative;
  height: auto;
  max-width: 70%;
}
.tv-card-imageCheck.selected {
  visibility: visible;
  transform: scale(1);
  z-index: 2;
}
.tv-card-imageCheck {
  display: block;
  visibility: hidden;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  transform: scale(0);
  transition-duration: 0.4s;
  z-index: 2;
}
.tv-card-imageOutline img {
  height: auto;
  max-width: 100%;
}
img.selected {
  box-shadow: 0 0 4px white;
  transform: scale(0.9);
  z-index: -1;
}
.tv-card button {
  display: inline-block;
  justify-content: center;
  width: 80%;
  border: 0px;
  border-radius: 6px;
  padding: 5px 0;
  background-color: var(--accent);
  color: var(--tg-theme-button-text-color);
  text-align: center;
}
</style>