<script>
import { store } from '../Store.js'
import  mainSelectionCardComponent  from './MainSelectionCard.vue'

export default {
  data() {
    return {
        store,
    }
  },

  components: {
    mainSelectionCardComponent
  },

  methods: {
    selectCard(selection_id) {
        let card = store.availableMSOptions.find(x => x._id === selection_id)

        card.display_variations ? this.$router.push('/CanvasSelection') : this.$router.push('/StandardDisplay')
    },

    pressingDown(selection_id) {
        let card = document.getElementById('ms-card-id_' + selection_id)

        card.style.transform = 'scale(0.95)'
        card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_id) {
        let card = document.getElementById('ms-card-id_' + selection_id)

        card.style.transform = 'scale(1)'
        card.style.transitionDuration = '0.2s'
    }
  },

  mounted() {
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
    <div class="ms-holder">
        <ui :id="'ms-card-id_' + option._id" class="ms-card noselect" @click="selectCard(option._id)" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)" v-for="option in store.availableMSOptions" :key="option._id">
            <mainSelectionCardComponent :mainSelectionCard="option" />
        </ui>
    </div>
</template>

<style scoped>
.ms-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vh 2vw;
}
.ms-card {
    box-sizing: border-box;
    width: 90%;
    margin-block: 2%;
    border: 1px solid rgba(0, 0, 0, 0.175);;
    border-radius: 0.375rem;
    padding: 10px;
    transition-duration: 0.4s;
}
.ms-card.selected {
    transform: scale(0.95)!important;
}

@media (prefers-color-scheme: dark) {
  .ms-card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>