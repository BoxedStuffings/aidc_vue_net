<script>
export default {
  data() {
    return {
        // Data recieved -- test values
        availableOptions: [
            { _id: 1, name: "Default", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
            { _id: 2, name: "Standard", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
            { _id: 3, name: "Custom", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."}
        ]
    }
  },

  methods: {
    selectCard(selection_id) {
        console.log("ph")
    },

    pressingDown(selection_id) {
      const card = document.getElementById("card-id_" + selection_id)
      card.style.transform = 'scale(0.95)'
      card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_id) {
      const card = document.getElementById("card-id_" + selection_id)
      card.style.transform = 'scale(1)'
      card.style.transitionDuration = '0.2s'
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
  <div class="card-holder">
    <div class="row row-cols-1 row-cols-md-1 g-0">
      <ui :id="'card-id_' + option._id" class="noselect" @click="selectCard(option._id)" v-for="option in availableOptions" :key="option._id">
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
  background: var(--tg-theme-bg-color);
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