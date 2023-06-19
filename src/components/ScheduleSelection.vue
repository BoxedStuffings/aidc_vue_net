<script>
import { store } from '../Store.js'
import { VueScrollPicker } from 'vue-scroll-picker'

export default {
  data() {
    return {
        store,
        telegramMainButton: Telegram.WebApp.MainButton,
        telegramBackButton: Telegram.WebApp.BackButton,
        scheduleSelectionTelegramButton: Function,
        scheduleSelectionBackButton: Function,

        dateTime: ['', ''],
        disable: true,
        choice: false,
        selectedOption: String,
        currentDateTime: String,
        selectedStartDate: '',
        selectedEndDate: ''
    }
  },

  components: {
    VueScrollPicker
  },

  watch: {
    selectedOption() {
        switch(this.selectedOption) {
            case 'default':
                this.$refs.scheduleHolder.classList.remove('enabled')
                this.$refs.schedulePicker.classList.remove('set')
                this.selectedStartDate = ''
                this.selectedEndDate = ''
                this.dateTime = ['default', 'default']
                break
            case 'schedule':
                this.$refs.scheduleHolder.classList.add('enabled')
                this.$refs.schedulePicker.classList.add('set')
                this.dateTime = ['', '']
                break
        }
    },

    selectedStartDate() {
        if (this.selectedStartDate != '') {
            this.dateTime[0] = this.selectedStartDate
            this.disable = false
        } else {
            this.disable = true
        }
        if (new Date(this.selectedStartDate) > new Date(this.selectedEndDate)) {
            this.selectedEndDate = 0
        }
    },

    selectedEndDate() {
        this.dateTime[1] = this.selectedEndDate
    },

    dateTime: {
        handler() {
            if ((this.dateTime[0] != '' && this.dateTime[1] != '') || (this.dateTime[0] == 'default' && this.dateTime[1] == 'default')) {
                this.choice = true
            } else {
                this.choice = false
            }
        },
        deep: true
    },

    choice() {
        // this.choice ? console.log("test") : console.log("false") 
        this.choice ? this.telegramMainButton.show() : this.telegramMainButton.hide()
    }

  },

  methods: {
    formatDateTime(dateTime) {
        return new Date(dateTime).toISOString().substring(0, 19)
    },

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    },

    checkOverlap(against_start, against_end, check_start, check_end) {
        if (against_start < check_start && check_start < against_end) {
            // Check starts in Against
            return true
        }
        if (against_start < check_end && check_end < against_end) {
            // Check ends in Against
            return true
        }
        if (check_start < against_start && against_end < check_end) {
            // Against in Check (Check wraps against)
            return true
        }
        return false
    },

    checkAvailablility() {
        return new Promise((resolve, reject) => {
            let results = []
            let tvsToScan = store.selectedTvs
            for (let i = 0; i < tvsToScan.length; i++) {
                if (tvsToScan[i].displays.length != 0){
                    for (let x = 0; x < tvsToScan[i].displays.length; x++) {
                        if (this.checkOverlap(tvsToScan[i].displays[x].display_start, tvsToScan[i].displays[x].display_end, this.dateTime[0], this.dateTime[1])) {
                            results.push({[tvsToScan[i]._id]: tvsToScan[i].displays[x]})
                            return
                        }
                    }
                }
            }
            if (results.length > 0) {
                reject(results)
            } else {
                resolve('No overlaps')
            }
        })
    }

    

  },

  mounted() {
    let now = new Date()

    this.currentDateTime = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))

    setInterval(() => {
        let now = new Date()
        this.currentDateTime = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))
    }, 1000);

    this.scheduleSelectionTelegramButton = () => {
      if (this.telegramMainButton.isVisible) {
        this.checkAvailablility().then((message) => {
            this.$router.push('/Confirmation')
            this.telegramMainButton.offClick(this.scheduleSelectionTelegramButton)
            this.telegramMainButton.hide()
        }).catch((result) => {
            console.log(result) // handle overlaps
        })
      }
    }
    
    this.scheduleSelectionBackButton = () => {
        if (this.telegramBackButton.isVisible) {
            this.telegramMainButton.offClick(this.scheduleSelectionBackButton)
            this.$router.go(-1)
            telegramBackButton.hide()
        }
    }

    this.telegramMainButton.setParams({
        text: 'Confirm',
    }).onClick(this.scheduleSelectionTelegramButton)

    this.telegramBackButton.show()
    this.telegramBackButton.onClick(this.scheduleSelectionBackButton)
  }

}
</script>

<template>
    <div class="ss-holder">
        <div class="ss-header noselect">
            <img src="../assets/boxedstuffings.png">
            <h2>Schedule Display</h2>
        </div>
        <div>
            <input type="radio" name="startOptions" value="default" id="option-default" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" for="option-default">Set as Default</label>
        </div>
        <div>
            <input type="radio" name="startOptions" value="schedule" id="option-schedule" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" for="option-schedule">Schedule Display</label>
        </div>
        <div ref="scheduleHolder" class="ss-dateTime-picker-holder">
            <div ref="schedulePicker" class="ss-dateTime-pickers">
                <div class="ss-dateTime-picker-row">
                    <h6>Starting DateTime: </h6>
                    <input type="datetime-local" class="form-control dateTime-picker" :min="currentDateTime" @change="startDateTimePicked" v-model="selectedStartDate">
                </div>
                <div class="ss-dateTime-picker-row">
                    <h6>Ending DateTime: </h6>
                    <input type="datetime-local" class="form-control dateTime-picker" :min="selectedStartDate" :disabled="disable" @change="endDateTimePicked" v-model="selectedEndDate">
                </div>
            </div>
        </div>
        Current Date: {{ currentDateTime }}<br>
        Selected Start Date: {{ selectedStartDate }}<br>
        Selected End Date: {{ selectedEndDate }}<br>
        Done?: {{ choice }}
    </div>
</template>

<style src="vue-scroll-picker/lib/style.css"></style>
<style scoped>
.ss-holder {
    height: 0;
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
    min-height: 7vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1%;
    text-align: left;
    font-size: 3vmin;
}
.ss-dateTime-picker-holder {
    height: 0vh;
    position: relative;
    border-radius: 0.375rem;
    padding-top: 1vh;
    background-color: color-mix(in srgb, #6c757d, white 10%);
    text-align: left;
    font-size: 3vmin;
    transform: translate(0, -7vh);
    transition-duration: 0.3s;
    z-index: -1;
}
.enabled {
    height: 22vh;
    transform: translate(0, -1vh);
}
.ss-dateTime-pickers{
    visibility: hidden;
    transition-duration: 0.05s;
}
.set {
    visibility: visible;
    z-index: 2;
}
.ss-dateTime-picker-row {
    height: 10vh;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 2%;
}
.dateTime-picker {
    min-width: 0 !important;
}
.form-control {
    font-size: 3vmin;
    min-width: 95%;
}
</style>