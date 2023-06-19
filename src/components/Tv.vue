<script>
import $ from 'jquery'
import { store } from '../Store.js'
import TvSkeleton from '../components/TvSkeleton.vue'

export default {
  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      loading: true
    }
  },

  components: {
    TvSkeleton
  },

  methods: {

    async initTV(){
      await $.ajax({
        url: 'https://heehee.amphibistudio.sg/api/tv',
        method: 'GET',
        headers: {
          'secret' : 'eyJpdiI6InNBaXdUV0RNeHhzRDc3NUJrY0JsWFE9PSIsInZhbHVlIjoiK0J6VHZPUzVOUUREcVUydGc4SHFxQWZsMzI4eVZqMDByRnFBNENhMFcyZz0iLCJtYWMiOiI4M2IxNGQxYTQxMmRlNDIzMTgyNDcyMGNmMTViNDk2MDBiMTE0ZjVkZWQ3MGI4ZWQ3MjYyNmViOTA2YTU0Y2RlIiwidGFnIjoiIn0='
        },
        success:  (success) => {
          store.initTVfromDB(success.data)
          console.log(success.data)
          console.log(success.token)
          $.ajaxSetup({
            headers: { 'Authorization' : 'Bearer ' + success.token }
          })
        },
        error: (error) => console.log(error)
      })
      this.loading = !this.loading
      store.initcount++
    },

    checkTVSelection() {
      store.availableTVsFromDataBase.forEach((tv) => {
        let selectionCheck = store.findIndexOfSelectedTv(tv)
        if (selectionCheck >= 0) {
          let ref = `button-ref-id_${tv._id}`
          this.$refs[ref][0].innerHTML = 'Unselect'
        }
      })
    },

    selectTV(TV, selection_ref) {
      let index = store.findIndexOfSelectedTv(TV)
      let button = this.$refs[selection_ref][0]

      if (index >= 0) {
        store.spliceSelectedTvAt(index)
        button.innerHTML = 'Select'
      } else {
        store.pushSelectedTv(TV)
        button.innerHTML = 'Unselect'
      }

      this.mainButtonVisibility()
    },

    pressingDown(selection_ref) {
        let card = this.$refs[selection_ref][0]

        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_ref) {
        let card = this.$refs[selection_ref][0]

        card.style.transform = 'scale(1)'
        card.style.transitionDuration = '0.2s'
    },

    mainButtonVisibility() {
      store.selectedTvs.length >= 1 ? this.telegramMainButton.show() : this.telegramMainButton.hide() 
    }

  },

  mounted() {
    store.initcount >= 1 ? this.loading = !this.loading : this.initTV()

    let tvTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.telegramMainButton.offClick(tvTelegramButton)
        this.$router.push('/ScheduleDisplay')
      }
    }

    this.telegramMainButton.setParams({
      text: 'Select Tv',
    }).onClick(tvTelegramButton)

    this.mainButtonVisibility()
  },

  updated() {
    this.checkTVSelection()
  }

}
</script>

<template>
  <div>
    <TvSkeleton v-if="this.loading"></TvSkeleton>
    <!-- Main Grid -->
    <div id="tv-grid" v-else-if="!this.loading">
    <!-- Individual cards -->
      <ui class="tv-card noselect" v-for="TV in store.availableTVsFromDataBase" :key="TV._id">
        <!-- Image outline for selection -->
        <div class="tv-card-imageOutline" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }">
          <!-- Card check mark -->
          <img class="tv-card-imageCheck" :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" src="../assets/boxedstuffings.png">
          <!-- Display image -->
          <img :class="{selected : store.findIndexOfSelectedTv(TV) >= 0 }" src="../assets/boxedstuffings.png">
        </div>
        <!-- Display name -->
        <p>TV • {{ TV._id }}</p>
        <button :ref="`button-ref-id_${TV._id}`" @click="selectTV(TV, `button-ref-id_${TV._id}`)" @touchstart="pressingDown(`button-ref-id_${TV._id}`)" @touchend="notPressingDown(`button-ref-id_${TV._id}`)">Select</button>
      </ui>
      <button @click="this.$router.push('/ScheduleDisplay')">test</button>
    </div>
  </div>
</template>

<style>
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