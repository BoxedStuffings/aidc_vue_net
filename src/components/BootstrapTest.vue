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



Date time picker from scheduleselection.vue

<script>
import { store } from '../Store.js'
import { VueScrollPicker } from 'vue-scroll-picker'


export default {
  data() {
    return {
        store,
        telegramMainButton: Telegram.WebApp.MainButton,
        telegramBackButton: Telegram.WebApp.BackButton,
        scheduleSelectionStartTelegramButton: Function,
        scheduleSelectionNextTelegramButton: Function,
        scheduleSelectionStartBackButton: Function,
        scheduleSelectionNextBackButton: Function,
        options: [
            {_id: 0, Description: 'Immediately'},
            {_id: 1, Description: 'In 10 Minutes'},
            {_id: 2, Description: 'In 1 Hour'}
        ],
        days: [...Array(8).keys()],
        hours: [...Array(24).keys()],
        minutes: [...Array(60).keys()],
        endTime: [0, 0, 0],
        startOrEnd: false,
        currentDate: String,
        selectedDate: '',
        selectedOption: {},
        selectedEndOption: '',
        calculate: '',
        endDate: '',
        calculatedEndDate: ''
    }
  },

  components: {
    VueScrollPicker
  },

  watch: {
    selectedOption() {
        switch(this.selectedOption._id) {
            case 0:
                this.calculate = this.currentDate
                break
            case 1:
                let tenAfterCurrent = this.addMinutes(new Date(this.currentDate), 10)
                this.calculate = this.formatDateTime(tenAfterCurrent.getTime() - (tenAfterCurrent.getTimezoneOffset() * 60000))
                break
            case 2:
                let sixtyAfterCurrent = this.addMinutes(new Date(this.currentDate), 60)
                this.calculate = this.formatDateTime(sixtyAfterCurrent.getTime() - (sixtyAfterCurrent.getTimezoneOffset() * 60000))
                break
            case 3:
                this.calculate = this.selectedDate
                break
        }
        console.log(this.calculate)
    },

    selectedEndOption() {
        if (this.selectedEndOption === 'specific') {
            this.endTime = [0, 0, 0]
        }
    },

    endTime: {
        handler() {
            if (this.endTime[0] != 0 || this.endTime[1] != 0 || this.endTime[2] != 0) {
                this.selectedEndOption = 'select'
            }
            let addedMinutes = this.endTime[0] * 1440  + this.endTime[1] * 60 + this.endTime[2]
            let newDateTime = this.addMinutes(new Date(this.calculate), addedMinutes)
            this.calculatedEndDate = this.formatDateTime(newDateTime.getTime() - (newDateTime.getTimezoneOffset() * 60000))
        },
        deep: true
    },

    endDate() {
        this.calculatedEndDate = this.endDate
    },

    calculatedEndDate() {
        if (this.calculatedEndDate.length != 0) {
            this.scheduleSelectionNextTelegramButton = () => {
                if (this.telegramMainButton.isVisible) {
                    store.setjobTiming([this.calculate, this.calculatedEndDate])
                    this.$router.push('/Confirmation')
                    this.telegramMainButton.offClick(this.scheduleSelectionNextTelegramButton)
                    this.telegramMainButton.hide()
                }
            }
 
            this.telegramMainButton.setParams({
                text: 'Next',
            }).onClick(this.scheduleSelectionNextTelegramButton)
            this.telegramMainButton.show()
        }
    },

    calculate() {
        this.mainButtonVisibility()
    }
  },

  methods: {
    formatDateTime(dateTime) {
        return new Date(dateTime).toISOString().substring(0, 19) // to 16
    },

    dateTimePicked() {
        this.selectedOption = {_id: 3, Description: 'DateTime'}
    },

    endDateTimePicked() {
        this.selectedEndOption = 'specific'
    },

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    },

    toggle() {
        this.startOrEnd = !this.startOrEnd
        this.endDate = this.calculate
    },

    mainButtonVisibility() {
        // this.calculate ? console.log("open") : console.log("close")
        this.calculate ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }

  },

  mounted() {
    let now = new Date()
    const telegramBackButton = Telegram.WebApp.BackButton

    this.currentDate = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))
    this.selectedDate = this.currentDate

    setInterval(() => {
        let now = new Date()
        this.currentDate = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))
    }, 1000);

    this.scheduleSelectionStartTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.startOrEnd = !this.startOrEnd
        this.telegramMainButton.offClick(this.scheduleSelectionStartTelegramButton)
        this.telegramBackButton.offClick(this.scheduleSelectionStartBackButton)
        this.telegramMainButton.hide()

        telegramBackButton.onClick(this.scheduleSelectionNextBackButton)
      }
    }
    
    this.scheduleSelectionStartBackButton = () => {
        if (this.telegramBackButton.isVisible) {
            this.telegramMainButton.offClick(this.scheduleSelectionStartTelegramButton)
            this.$router.go(-1)
            telegramBackButton.hide()
        }
    }

    this.scheduleSelectionNextBackButton = () => {
        if (this.telegramBackButton.isVisible) {
            this.startOrEnd = !this.startOrEnd
            this.telegramMainButton.offClick()

            this.telegramMainButton.setParams({
                text: 'Select End'
            }).onClick(this.scheduleSelectionStartTelegramButton)
            this.mainButtonVisibility()
        }
    }

    this.telegramMainButton.setParams({
        text: 'Select End time',
    }).onClick(this.scheduleSelectionStartTelegramButton)

    this.telegramBackButton.show()
    this.telegramBackButton.onClick(this.scheduleSelectionStartBackButton)

    this.mainButtonVisibility()
  }

}
</script>

<template>
    <!-- End DateTime Picker -->
    <div class="ss-holder" v-if="startOrEnd">
        <button @click="toggle">false</button>
        <div class="ss-header noselect">
            <img src="../assets/boxedstuffings.png">
            <h2>Schedule Display: select end time</h2>
        </div>
        <!-- Option -->
        <input type="radio" name="endOptions" value="select" id="selectEndTime" class="btn-check" v-model="selectedEndOption">
        <label class="btn btn-secondary ss-btn" for="selectEndTime" :style="{'margin-block':'1%'}">
            Select how long to display:
        </label>
        <div class="picker-group">
            <h4>Days</h4>
            <h4>Hours</h4>
            <h4>Minutes</h4>
            <VueScrollPicker :options="days" v-model="endTime[0]" />
            <VueScrollPicker :options="hours" v-model="endTime[1]" />
            <VueScrollPicker :options="minutes" v-model="endTime[2]" />
        </div>
        <!-- DateTime selector -->
        <input type="radio" name="endOptions" value="specific" id="end-option-Date" class="btn-check" v-model="selectedEndOption">
        <label class="btn btn-secondary ss-btn" :style="{'margin-top':'15%'}" for="end-option-Date">
            or Choose specific Date & Time
            <span>
                <input ref="test" type="datetime-local" :min="calculate" class="form-control" @change="endDateTimePicked" v-model="endDate">
            </span>
        </label>
        End Day: {{ endTime[0] }}<br>
        End Hour: {{ endTime[1] }}<br>
        End Minutes: {{ endTime[2] }}<br>
        End DateTime: {{ endDate }}<br>
        Calculated End Date: {{ calculatedEndDate }}
    </div>
    <!-- Start DateTime Picker -->
    <div class="ss-holder" v-else>
        <button @click="toggle">true</button>
        <div class="ss-header noselect">
            <img src="../assets/boxedstuffings.png">
            <h2>Schedule Display: select start time</h2>
        </div>
        <!-- Options -->
        <ui v-for="option in options" :key="option._id">
            <input type="radio" name="startOptions" :value="option" :id="'option_' + option._id" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" :for="'option_' + option._id">{{ option.Description }}</label>
        </ui>
        <!-- DateTime selector -->
        <input type="radio" name="startOptions" :value="{_id: 3, Description: 'DateTime'}" id="option_Date" class="btn-check" v-model="selectedOption">
        <label class="btn btn-secondary ss-btn" for="option_Date">
            Choose Date & Time
            <span>
                <input type="datetime-local" :min="currentDate" class="form-control" @change="dateTimePicked" v-model="selectedDate">
            </span>
        </label>
        Current Date: {{ currentDate }}<br>
        Selected Date: {{ selectedDate }}<br>
        Selected Option: {{ selectedOption }}<br>
        Calculated Date: {{ calculate }}
    </div>
</template>

<style src="vue-scroll-picker/lib/style.css"></style>
<style scoped>
.picker-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
}
.picker-group h4 {
    margin: 0;
}
.picker-group :deep(.vue-scroll-picker-layer-top) {
    background: linear-gradient(180deg, var(--tg-theme-bg-color) 10%, color-mix(in srgb, var(--tg-theme-bg-color), transparent 40%));
}
.picker-group :deep(.vue-scroll-picker-layer-bottom) {
    background: linear-gradient(0deg, var(--tg-theme-bg-color) 10%, color-mix(in srgb, var(--tg-theme-bg-color), transparent 40%));
}
.ss-holder {
    display: flex;
    flex-direction: column;
    padding: 1vh 2vw;
}
.ss-header {
    display: flex;
    margin-block: 2%;
}
.ss-header img {
    height: 100%;
    width: 8vw;
    object-fit: cover;
    border-radius: 8px;
}
.ss-header h2 {
    width: 100%;
    margin-block: 0;
    padding: 1%;
    font-size: 4vmin;
}
.ss-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 7vh;
    margin-top: 1%;
    text-align: left;
    font-size: 3vmin;
}
.form-control {
    font-size: 3vmin;
    min-width: 95%;
}
</style>