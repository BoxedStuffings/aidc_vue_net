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
    <div id="mainSelectionHolder">
        <ui :id="'mainSelectionCard_' + index" class="mainSelectionCard" @click="test(index)" v-for="(options, index) in availableOptions" :key="index">
            <div id="mainSelectionCardHolder">
                <img class="mainSelectionCardIcon" src="../assets/boxedstuffings.png">
                <div id="mainSelectionCardTexts">
                    <h1>{{ options.name }}</h1>
                    <p class="mainSelectionCardDescription">{{ options.description }}</p>    
                </div>       
            </div>
        </ui>
    </div>
</template>

<style scoped>
#mainSelectionHolder {
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
#mainSelectionCardHolder {
    position: relative;
    display: flex;
    flex-direction: row;
}
.mainSelectionCardIcon {
    height: 15vh;
    border-radius: 8px;
}
#mainSelectionCardTexts {
    margin-left: 10px;
}

</style>