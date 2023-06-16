<script>
import { store } from '../Store.js'
import  cardtest  from './Card.Vue'

export default {
  data() {
    return {
      // Data received -- test values from store
      store,
    }
  },

  components: {
    cardtest
  },

  methods: {
    selectCard(selection_id) {
        this.$router.push('/Imageup')
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
        <cardtest :cardOption="option" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)" />
        <!-- <div class="col">
          <div class="card" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)">
            <img src="../assets/boxedstuffings.png" class="card-img-top card-img">
            <div class="card-body">
              <h1 class="card-title">{{ option.name }}</h1>
              <p class="card-text">{{ option.description }}</p>
            </div>
          </div>
        </div> -->
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


<!-- canvas old -->

<!-- <script>
import { store } from '../../Store.js'
import CloseButton from '../Elements/CloseButton.vue'
import draggable from 'vuedraggable'

export default {
    name: "simple",
    display: "Simple",
    order: 0,
    data() {
        return {
            canvasLayers: [],
            canvasElement: Object,
            canvasKey: String,
        }
    },

    components: {
        CloseButton,
        draggable
    },

    methods: {
        checkMove: function(e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
        toggleEditBox(key, element, toggle) {
            this.$refs.canvasEdit.classList.toggle('open')
            if (toggle) {
                this.canvasElement = element
                this.canvasKey = key
            } else {

            }
        },

        editCanvasObject(option) {
            this.$parent.$parent.$parent.editCanvasObject(this.canvasElement, option, this.canvasKey)
            if (option !== 1 || option !== 3) {
            this.toggleEditBox(null, null, false)
            }
        }
    },

    mounted() {
        this.canvasLayers = store.canvasObjects
        console.log(this.list)
        console.log(this.canvasLayers)
    }

}
</script>

<template>
    <div class="canvas-holder">
        <div ref="canvasEdit" class="canvas-edit">
            <div class="canvas-edit-box">
                <div class="canvas-edit-box-close">
                    <CloseButton :scale="0.9" :background="'#3A3A3A'" :cross="'#A5A6A8'" :darken="'85%'" @click="toggleEditBox(null, null, false)"></CloseButton>
                </div>
                <ui class="canvas-edit-box-options noselect" v-sortable>
                    <li class="canvas-edit-box-option" @click="editCanvasObject(1)"><h5>Bring Foward</h5></li>
                    <li class="canvas-edit-box-option" @click="editCanvasObject(2)"><h5>Send Backwards</h5></li>
                    <li class="canvas-edit-box-option" @click="editCanvasObject(3)"><h5>Bring to Front</h5></li>
                    <li class="canvas-edit-box-option" @click="editCanvasObject(4)"><h5>Send to Back</h5></li>
                    <li class="canvas-edit-box-option delete-box" @click="editCanvasObject(5)"><h5>Delete Object</h5></li>
                </ui>
            </div>
        </div>
        <draggable :list="canvasLayers" :disabled="false" class="list-group" :move="checkMove">
            <template #item="{ element }">
                <details class="canvas-layer" @click="toggleEditBox(element.Object, value, true)">
                    <summary class="canvas-layer-details noselect">{{ element.key }}</summary>
                 </details>
            </template>
        </draggable>
        <!-- <div class="list-group-item">
                    {{ element.Name }}
                </div> -->
        <!-- <ui class="canvas-ui" v-for="value, key in canvasLayers" :key="key">
            <details class="canvas-layer" @click="toggleEditBox(key, value, true)">
                <summary class="canvas-layer-details noselect">{{ key }}</summary>
            </details>
        </ui> -->
    </div>
</template>

<style scoped>
.canvas-holder {
    display: flex;
    flex-direction: column;
    padding: 5%;
    background-color: var(--tg-theme-bg-color);
}
.canvas-edit {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    background-color: transparent;
    backdrop-filter: blur(3px);
    z-index: 99;
}
.open{
    visibility: visible;
}
.canvas-edit-box {
    height: 60vh;
    width: 80vw;
    border-radius: 0.375rem;
    background-color: var(--tg-theme-secondary-bg-color);
    background-color: #2A2A2A;
}
.canvas-edit-box-close {
    display: flex;
    justify-content: flex-end;
}
.canvas-edit-box-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 50%;
    column-gap: 2%;
    row-gap: 10%;
    padding-inline: 5%;
}
.canvas-edit-box-option {
    display: grid;
    align-items: center;
    justify-items: center;
    margin-block: 2%;
    border-radius: 0.375rem;
    padding: 1%;
    background-color: var(--tg-theme-bg-color);
    background-color: #3B3C3E;
}
.delete-box {
    grid-column: 1/3;
    grid-row: 3/4;
}
h5 {
    margin: 0;
    color: var(--tg-theme-text-color);
}
.canvas-ui {
    margin: 1%;
}
.canvas-layer {
    list-style: none;
}
.canvas-layer-details {
    position: relative;
    border-radius: 0.375rem;
    padding: 1% 1.5%;
    list-style: none;
    border: 1px solid black;
}
.canvas-layer-details:after{
    height: .5rem;
    width: .5rem;
    content: '';
    position: absolute;
    top: 10.5px;
    right: 25px;
	display: inline-block;
	float: right;
	border-bottom: 2px solid currentColor;
	border-left: 2px solid currentColor;
	border-bottom-left-radius: 2px;
    transform-origin: center center;
	transform: rotate(45deg) translate(50%, 0%);
	transition: transform ease-in-out 100ms
}
</style> -->