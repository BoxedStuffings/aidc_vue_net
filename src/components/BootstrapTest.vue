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
    selectCard(selection_id) {
        this.$router.push('/ImageUp')
    },

    pressingDown(selection_id) {
      let card = document.getElementById('card-id_' + selection_id)

      card.style.transform = 'scale(0.95)'
      card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_id) {
      let card = document.getElementById('card-id_' + selection_id)

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
          <div class="card" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)">
            <img src="../assets/boxedstuffings.png" class="card-img-top card-img">
            <div class="card-body">
              <h1 class="card-title">{{ option.name }}</h1>
              <p class="card-text">{{ option.description }}</p>
            </div>
          </div>
        </div>
      </ui>
    </div>
  </div>
</template>

<style scoped>
.card-holder{
  padding: 1vh 2vw;
}
.card{
  margin-top: 2vh;
  background-color: var(--tg-theme-bg-color);
}
.card-img {
  max-height: 25vh;
  border-radius: 0.8rem;
  padding: 2%;
}
.card-body{
  font-size: 2.5vmin;
}

@media (prefers-color-scheme: dark) {
  .card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>