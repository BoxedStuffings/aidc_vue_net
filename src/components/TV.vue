<script>
export default {
  data() {
    return {
      // Data to be sent
      selectedTvs: [],
      
      // Data recieved -- test values
      availableTVs: [
        {
          "_id": 1,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683464890493"}},
          "created_at":{"$date":{"$numberLong":"1683459833600"}}
        },

        {
          "_id": 2,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683462882369"}},
          "created_at":{"$date":{"$numberLong":"1683462580446"}}
        },

        {
          "_id": 3,
          "current_display":null,
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "updated_at":{"$date":{"$numberLong":"1683488829939"}},
          "created_at":{"$date":{"$numberLong":"1683462677844"}},
          "displays":[
            {"tv_id":{"$numberInt":"3"},
              "display_type":"seed",
              "display_variation":"seed",
              "display_start":"2023-05-08T14:30",
              "display_end":"2023-05-08T16:30",
              "userdefinedfields":{
                "field1":{
                    "size":"12",
                    "font":"Montserrat",
                    "colour":"#HEX"
                  }
                },
              "_id":{"$oid":"6457e537888697b4e10d9323"}
            },
            {"tv_id": 3,
              "display_type":"2",
              "display_variation":"1",
              "display_start":"2023-05-08T08:30",
              "display_end":"2023-05-08T09:30",
              "userdefinedfields":{
                "field1":{
                    "size":"12",
                    "font":"Montserrat",
                    "colour":"#HEX"
                  }
                },
              "_id":{"$oid":"6458003d0f33f0ac5d09ed62"}
            }
          ]
        },

        {
          "_id": 4,
          "current_display":"nnn",
          "image":"adwdwadawd.com",
          "info":"wdwdwd",
          "address":"heheMACAddress",
          "displays":[
              {
                "tv_id": 4,
                "display_type":"2",
                "display_variation":"1",
                "display_start":"2023-05-08T08:30",
                "display_end":"2023-05-08T09:30",
                "userdefinedfields":{
                  "field1":{
                      "size":"12",
                      "font":"Montserrat",
                      "colour":"#HEX"
                    }
                  },
                "_id":{"$oid":"645805da560e36c1dd0c39a2"}
              }
            ],
          "updated_at":{"$date":{"$numberLong":"1683490266918"}},
          "created_at":{"$date":{"$numberLong":"1683489545605"}}
        }
      ],
    }
  },

  methods: {
    selectTV(TV, selection_id) {
      const index = this.selectedTvs.findIndex(x => x == TV)
      const button = document.getElementById("button-id_" + selection_id)
      const tgMainButton = Telegram.WebApp.MainButton

      if (index >= 0) {
        this.selectedTvs.splice(index, 1)
        button.innerHTML = "Select"
      } else {
        this.selectedTvs.push(TV)
        button.innerHTML = "Unselect"
      }

      if (this.selectedTvs.length >= 1) { 
        tgMainButton.show()
      } else {
        tgMainButton.hide()
      }
    },

    pressingDown(selection_id) {
        const card = document.getElementById("button-id_" + selection_id)

        card.style.transitionDuration = '0.4s'
        card.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_id) {
        const card = document.getElementById("button-id_" + selection_id)

        card.style.transitionDuration = '0.2s'
        card.style.transform = 'scale(1)'
    }
  },

  mounted() {
    Telegram.WebApp.MainButton.setParams({
      text: 'Select Tv',
    }).onClick(() => {
      if (Telegram.WebApp.MainButton.isVisible) {
        this.$router.push('/MainSelection')
        Telegram.WebApp.MainButton.hide()
      }
    })
  }

}
</script>

<template>
    <!-- Main Grid -->
    <div id="tv-grid">
        <!-- Individual cards -->
        <ui class="tv-card noselect" v-for="TV in availableTVs" :key="TV._id">
          <!-- Outline for selection -->
          <div class="tv-card-imageOutline" :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }">
            <!-- Card check mark -->
            <img class="tv-card-imageCheck" :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }" src="../assets/boxedstuffings.png">
            <!-- Display image -->
            <img :class="{selected : selectedTvs.findIndex(t => t == TV) >= 0 }" src="../assets/boxedstuffings.png">
          </div>
            <!-- Display name -->
            <p>TV • {{ TV._id }}</p>
            <button :id="'button-id_' + TV._id" @click="selectTV(TV, TV._id)" @touchstart="pressingDown(TV._id)" @touchend="notPressingDown(TV._id)">Select</button>
        </ui> 
        {{ selectedTvs }}  <!-- for testing -->
    </div>
</template>

<style scoped>
#tv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  row-gap: 2vh;
  justify-items: center;
  margin: 2vh 2vw;
  box-sizing: border-box;
}
.tv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
}
.tv-card-imageOutline {
  position: relative;
  height: auto;
  max-width: 70%;
}
.tv-card-imageCheck.selected {
  visibility: visible;
  transform: scale(1);
  z-index: 2;
}
.tv-card-imageCheck {
  display: block;
  visibility: hidden;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  transform: scale(0);
  transition-duration: 0.4s;
  z-index: 2;
}
.tv-card-imageOutline img {
  height: auto;
  max-width: 100%;
}
img.selected {
  box-shadow: 0 0 4px white;
  transform: scale(0.9);
  z-index: -1;
}
.tv-card button {
  display: inline-block;
  justify-content: center;
  width: 80%;
  border: 0px;
  border-radius: 6px;
  padding: 5px 0;
  background-color: var(--accent);
  color: var(--tg-theme-text-color);
  text-align: center;
}
</style>