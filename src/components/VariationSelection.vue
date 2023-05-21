<script>
import { store } from '../Store.js'
import  cardComponent  from './VariationCard.vue'

export default {
  data() {
    return {
      store
    }
  },

  components: {
    cardComponent
  },

  methods: {
    selectCard(selection_id) {
      this.$router.push('/ScheduleSelection')
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
  <div class="card-holder">
    <div class="row row-cols-1 row-cols-md-1 g-0">
      <ui :id="'card-id_' + option._id" class="noselect" @click="selectCard(option._id)" v-for="option in store.availableCardOptions" :key="option._id">
        <div class="col">
          <cardComponent :ref="`card-ref-id_${option._id}`" :card="option" @touchstart="pressingDown(`card-ref-id_${option._id}`)" @touchend="notPressingDown(`card-ref-id_${option._id}`)"></cardComponent>
        </div>
      </ui>
    </div>
  </div>
</template>

<style scoped>
.card-holder{
  padding: 1vh 2vw;
}
</style>