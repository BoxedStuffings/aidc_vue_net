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
        this.$router.push('/BootstrapTest')
    },

    pressingDown(index) {
        const card = document.getElementById("mainSelectionCard_" + index)
        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(index) {
        const card = document.getElementById("mainSelectionCard_" + index)
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
    <div class="mainSelectionHolder">
        <ui :id="'mainSelectionCard_' + index" class="mainSelectionCard noselect" @click="SelectCard(index)" @touchstart="pressingDown(index)" @touchend="notPressingDown(index)" v-for="(options, index) in availableOptions" :key="index">
            <div class="mainSelectionCard-Holder">
                <img class="mainSelectionCard-Icon" src="../assets/boxedstuffings.png">
                <div class="mainSelectionCard-Texts">
                    <h2>{{ options.name }}</h2>
                    <p class="mainSelectionCard-Description">{{ options.description }}</p>    
                </div>       
            </div>
        </ui>
    </div>
</template>

<style scoped>
.mainSelectionHolder {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.mainSelectionCard {
    box-sizing: border-box;
    width: 90%;
    margin: 1%;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 2px 5px #888888;
    transition-duration: 0.4s;
}
.mainSelectionCard.selected {
    transform: scale(0.95)!important;
}
.mainSelectionCard-Holder {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.mainSelectionCard-Icon {
    height: 15vh;
    width: auto;
    border-radius: 8px;
}
.mainSelectionCard-Texts {
    margin-left: 10px;
}
.mainSelectionCard-Texts h2 {
    margin-block: 0;
}
.mainSelectionCard-Description {
    font-size: 2.5vmin;
    margin: 1px;
    min-height: 90%;
}
</style>