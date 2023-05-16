<script>
import { store } from '../Store.js'
import  mainSelectionCardComponent  from './MainSelectionCard.vue'

export default {
  data() {
    return {
        // Data received -- test values from store
        store,
    }
  },

  components: {
    mainSelectionCardComponent
  },

  methods: {
    selectCard(selection_id) {
        let card = store.standardDisplayOptions.find(x => x._id === selection_id)

        card.title === "Static Image" ? this.$router.push('/ImageUp') : this.$router.push('/VideoUp')
    },

    pressingDown(selection_id) {
        let card = document.getElementById('sd-card-id_' + selection_id)

        card.style.transform = 'scale(0.95)'
        card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_id) {
        let card = document.getElementById('sd-card-id_' + selection_id)

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
    <div class="sd-holder">
        <ui :id="'sd-card-id_' + option._id" class="sd-card noselect" @click="selectCard(option._id)" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)" v-for="option in store.standardDisplayOptions" :key="option._id">
            <mainSelectionCardComponent :mainSelectionCard="option" />
        </ui>
    </div>
</template>

<style scoped>
.sd-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vh 2vw;
}
.sd-card {
    box-sizing: border-box;
    width: 90%;
    margin-block: 2%;
    border: 1px solid rgba(0, 0, 0, 0.175);;
    border-radius: 0.375rem;
    padding: 10px;
    transition-duration: 0.4s;
}
.sd-card.selected {
    transform: scale(0.95)!important;
}

@media (prefers-color-scheme: dark) {
  .sd-card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>