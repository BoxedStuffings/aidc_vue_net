<script>
import { store } from '../Store.js'
import  mainSelectionCardComponent  from './MainSelectionCard.vue'

export default {
  data() {
    return {
      store,
      telegramMainButton: Telegram.WebApp.MainButton,
      card: {}
    }
  },

  components: {
    mainSelectionCardComponent
  },

  methods: {
    selectCard(selection_id) {
      this.card = store.availableMSOptions.find(x => x._id === selection_id)

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

    mainButtonVisibility() {
      this.card._id ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    },

    testtt() {
      switch(this.card.title) {
          case 'Custom':
           console.log("Custom")
            break;
          case 'Standard':
            console.log("standard")
            break;
      }
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
    }),

    this.telegramMainButton.setParams({
      text: 'Next',
    }).onClick(() => {
      if (this.telegramMainButton.isVisible) {
        switch(this.card.title) {
          case 'Custom':
            this.$router.push('/CanvasSelection');
            break;
          case 'Standard':
            this.$router.push('/StandardDisplay')
            break;
        }
        
        this.telegramMainButton.hide()
      }
    })
    
    this.mainButtonVisibility()
  }

}
</script>

<template>
  <div class="ms-holder">
    <ui :ref="`ms-card-ref-id_${option._id}`" :id="'ms-card-id_' + option._id" class="ms-card noselect" :class="{selected : this.card._id === option._id }" @click="selectCard(option._id)" @touchstart="pressingDown(`ms-card-ref-id_${option._id}`)" @touchend="notPressingDown(`ms-card-ref-id_${option._id}`)" v-for="option in store.availableMSOptions" :key="option._id">
      <mainSelectionCardComponent :mainSelectionCard="option"></mainSelectionCardComponent>
    </ui>
    <button @click="this.$router.go(-1)">test</button>
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