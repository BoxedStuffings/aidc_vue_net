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
    test(index) {
        const card = document.getElementById("mainSelectionCard_" + index)
        if (card.classList.contains("selected")) {
            card.classList.remove("selected")
        } else {
            card.classList.add("selected")
        }
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
        <ui :id="'mainSelectionCard_' + index" class="mainSelectionCard" @click="test(index)" v-for="(options, index) in availableOptions" :key="index">
            <div class="mainSelectionCardHolder">
                <img class="mainSelectionCardIcon" src="../assets/boxedstuffings.png">
                <div class="mainSelectionCardTexts">
                    <h2>{{ options.name }}</h2>
                    <p class="mainSelectionCardDescription">{{ options.description }}</p>    
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
    transform: scale(0.9);
}
.mainSelectionCardHolder {
    display: flex;
    flex-direction: row;
    height: 100%;
}
.mainSelectionCardIcon {
    height: 15vh;
    width: auto;
    border-radius: 8px;
}
.mainSelectionCardTexts {
    margin-left: 10px;

}
.mainSelectionCardTexts h2 {
    margin-block: 0;
}
.mainSelectionCardDescription {
    font-size: 2.5vmin;
    margin: 1px;
    min-height: 90%;
}

</style>