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
        const card = store.availableMSOptions.find(x => x._id === selection_id)
        card.display_variations ? this.$router.push('/BootstrapTest') : console.log("test")
    },

    pressingDown(selection_id) {
        const card = document.getElementById("ms-card-id_" + selection_id)
        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_id) {
        const card = document.getElementById("ms-card-id_" + selection_id)
        card.style.transitionDuration = '0.2s'
        card.style.transform = 'scale(1)'
    }
  },

  mounted() {
    Telegram.WebApp.BackButton.show()
    Telegram.WebApp.BackButton.onClick(() => {
      if (Telegram.WebApp.BackButton.isVisible) {
        this.$router.go(-1)
        Telegram.WebApp.BackButton.hide()
      }
    })
  }

}
</script>

<template>
    <div class="ms-holder">
        <ui :id="'ms-card-id_' + option._id" class="ms-card noselect" @click="selectCard(option._id)" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)" v-for="option in store.availableMSOptions" :key="option._id">
            <div class="ms-card-holder">
                <div class="ms-card-header">
                    <img class="ms-card-icon" src="../assets/boxedstuffings.png">
                    <h2>{{ option.title }}</h2>
                </div>
                <p class="ms-card-description">{{ option.desc }}</p>    
            </div>
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
.ms-card-holder {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ms-card-header {
    display: flex;
    align-items: center;
}
.ms-card-header h2 {
    width: 100%;
    margin-block: 0;
    padding: 1%;
    font-size: 4vmin;
}
.ms-card-icon {
    height: 100%;
    width: 8vw;
    object-fit: cover;
    border-radius: 8px;
}
.ms-card-description {
    min-height: 90%;
    margin-block: 0.5rem;
    font-size: 2.5vmin;
}

@media (prefers-color-scheme: dark) {
  .ms-card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>