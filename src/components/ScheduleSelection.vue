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
.picker-group >>> .vue-scroll-picker-layer-top {
    background: linear-gradient(180deg, var(--tg-theme-bg-color) 10%, color-mix(in srgb, var(--tg-theme-bg-color), transparent 40%));
}
.picker-group >>> .vue-scroll-picker-layer-bottom {
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