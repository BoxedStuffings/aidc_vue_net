<script>
export default {
  data() {
    return {
        // Data recieved -- test values
        availableOptions: [
            { id: "01", name: "Default", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
            { id: "02", name: "Standard", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."},
            { id: "03", name: "Custom", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et magna facilisis, tempus orci a, eleifend tellus. Pellentesque blandit neque semper odio ultrices, eu gravida nulla egestas. Donec convallis ante id risus posuere, eget finibus ante fringilla. Mauris pulvinar urna eu nisl tristique iaculis eget placerat neque. Nunc faucibus bibendum nulla, eu ultricies lorem ullamcorper quis. Pellentesque porta euismod dolor id consectetur."}
        ]
    }
  },

  methods: {
    SelectCard(index) {
        console.log("ph")
    },

    pressingDown(index) {
      const card = document.getElementById("Card_" + index)
      card.style.transitionDuration = '0.4s'
      card.style.transform = 'scale(0.95)'
    },

    notPressingDown(index) {
      const card = document.getElementById("Card_" + index)
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
  <div class="card-holder">
    <div class="row row-cols-1 row-cols-md-1 g-4">
      <ui :id="'Card_' + index" class="" @click="SelectCard(index)" v-for="(options, index) in availableOptions" :key="index">
        <div class="col">
          <div class="card" @touchstart="pressingDown(index)" @touchend="notPressingDown(index)">
            <img src="../assets/boxedstuffings.png" class="card-img-top card-img" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ options.name }}</h5>
              <p class="card-text">{{ options.description }}</p>
            </div>
          </div>
        </div>
      </ui>
    </div>
  </div>
</template>

<style scoped>
.card-holder{
  padding: 2vh 2vw;
}
.card-img {
  max-height: 30vh;
  padding: 2%;
  border-radius: 0.6rem;
}
.card-body{
  font-size: 2.5vmin;
}
</style>