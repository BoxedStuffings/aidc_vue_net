<script>
import { store } from '../Store.js'
import  mainSelectionCardComponent  from './MainSelectionCard.vue'

export default {
  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      telegramBackButton: Telegram.WebApp.BackButton,
      card: {}
    }
  },

  components: {
    mainSelectionCardComponent
  },

  watch: {
    card() {
      this.card._id ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }
  },

  methods: {
    selectCard(selection_id) {
      this.card = store.availableMSOptions.find(x => x._id === selection_id)
      console.log(this.card)
      this.mainButtonVisibility()
    },

    pressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transform = 'scale(0.95)'
      card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transform = 'scale(1)'
      card.style.transitionDuration = '0.2s'
    },

  },

  beforeMount() {
    const mainButton = () => {
      this.telegramMainButton.hide()
      switch(this.card.title) {
        case 'Upload Image':
          this.$router.push('/ImageUp')
          break
        case 'Upload Video':
          this.$router.push('/VideoUp')
          break
        case 'Create Custom Banner':
          this.$router.push('/CanvasSelection')
      }
    }

    const backButton = () => {
      Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
      Telegram.WebApp.offEvent('backButtonClicked', backButton)

      this.telegramMainButton.hide()
      this.$router.go(-1)
    }

    this.telegramMainButton.setParams({ text: 'Next'})
    Telegram.WebApp.onEvent('mainButtonClicked', mainButton)
    
    Telegram.WebApp.onEvent('backButtonClicked', backButton)
  },

  mounted() {
    this.telegramBackButton.show()

  }

}
</script>

<template>
  <div class="ms-holder">
    <ui :ref="`ms-card-ref-id_${option._id}`" :id="'ms-card-id_' + option._id" class="ms-card noselect" :class="{selected : this.card._id === option._id }" @click="selectCard(option._id)" @touchstart="pressingDown(`ms-card-ref-id_${option._id}`)" @touchend="notPressingDown(`ms-card-ref-id_${option._id}`)" v-for="option in store.availableMSOptions" :key="option._id">
      <mainSelectionCardComponent :mainSelectionCard="option"></mainSelectionCardComponent>
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
  border-color: var(--accent);
}

@media (prefers-color-scheme: dark) {
  .ms-card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>