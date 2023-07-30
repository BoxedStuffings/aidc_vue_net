<script>
import { store } from '../Store.js'
import { useToast } from "vue-toastification"

export default {
    setup() {
        const toast = useToast()
        return {toast}
    },

    data() {
    return {
        store,
        telegramMainButton: Telegram.WebApp.MainButton,
        telegramBackButton: Telegram.WebApp.BackButton,
        timeOnLoad: Object,
        currentDateTime: String,
        selectedOption: String,
        dateTime: ['', ''],
        selectedStartDate: '',
        selectedEndDate: '',
        disable: true,

        choice: false,
    }},

    watch: {
        selectedOption() {
            switch(this.selectedOption) {
                case 'default':
                    this.$refs.scheduleHolder.classList.remove('enabled')
                    this.$refs.schedulePicker.classList.remove('set')
                    this.selectedEndDate = ''
                    this.dateTime = ['default', 'default']
                    break
                case 'schedule':
                    this.$refs.scheduleHolder.classList.add('enabled')
                    this.$refs.schedulePicker.classList.add('set')
                    this.selectedStartDate = this.currentDateTime
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
                this.selectedEndDate = ''
            }
        },

        selectedEndDate() {
            if (this.selectedOption != 'default') {
                this.dateTime[1] = this.selectedEndDate
            }
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
            this.choice ? this.telegramMainButton.show() : this.telegramMainButton.hide()
        }
    },

    methods: {
        formatDateTime(dateTime) {
            return new Date(dateTime).toISOString().substring(0, 16)
        },

        addMinutes(date, minutes) {
            return new Date(date.getTime() + minutes * 60000);
        },

        checkOverlap(against_start, against_end, check_start, check_end) {
            let against_start_date = new Date(against_start)
            let against_end_date = new Date(against_end)
            let check_start_date = new Date(check_start)
            let check_end_date = new Date(check_end)

            if (against_start_date < check_start_date && check_start_date < against_end_date) {
                // Check starts in Against
                return true
            }
            if (against_start_date < check_end_date && check_end_date < against_end_date) {
                // Check ends in Against
                return true
            }
            if (check_start_date < against_start_date && against_end_date < check_end_date) {
                // Against in Check (Check wraps Against)
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
                            let against_start = tvsToScan[i].displays[x].display_start
                            let against_end = tvsToScan[i].displays[x].display_end
                            if (this.checkOverlap(against_start, against_end, this.dateTime[0], this.dateTime[1])) {
                                results.push({[tvsToScan[i]._id]: tvsToScan[i].displays[x]})
                                break
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
        },

        pushToast(result, avail) {
            let toastMsg = ''
            if (avail) {
                toastMsg = 'TV(s): '
                result.forEach(element => {
                    toastMsg += Object.keys(element) + ', '
                });
                toastMsg += 'has jobs scheduled at this time.'
            } else {
                toastMsg = result[0]
            }
        
            this.toast.error(toastMsg, {
                position: 'bottom-left',
                timeout: 5000,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.5,
                closeButton: 'button',
                icon: true
            })
        }
        
    },

    beforeMount() {
        const mainButton = () => {
            if (this.selectedOption === 'default') {
                store.setjobType(false)
                store.setjobTiming(this.dateTime)
                this.$router.push('/Confirmation')
            } else {
                this.checkAvailablility().then((message) => {
                    if (message === 'No overlaps') {
                        let start = new Date(this.dateTime[0])
                        if (start <= this.timeOnLoad) {
                            this.telegramMainButton.show()
                            this.pushToast(['Selected datetime is earlier than current time'], false)
                        } else {
                            store.setjobType(true)
                            store.setjobTiming(this.dateTime)
                            this.$router.push('/Confirmation')
                        }
                    }
                }).catch((result) => {
                    this.telegramMainButton.show()
                    this.pushToast(result, true)
                })
            }
        }

        const backButton = () => {
            Telegram.WebApp.offEvent('mainButtonClicked', mainButton)
            this.telegramMainButton.hide()
            this.$router.go(-1)
        }

        this.telegramMainButton.setParams({ text: 'Next'})
        Telegram.WebApp.onEvent('mainButtonClicked', mainButton)

        Telegram.WebApp.onEvent('backButtonClicked', backButton)
    },

    mounted() {
        this.timeOnLoad = new Date()
        this.telegramBackButton.show()

        let now = new Date()
        this.currentDateTime = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))

        setInterval(() => {
            let now = new Date()
            this.currentDateTime = this.formatDateTime(now.getTime() - (now.getTimezoneOffset() * 60000))
        }, 1000)

        Telegram.WebApp.expand()
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
            <label class="btn btn-secondary ss-btn" for="option-default"><h6>Set as Default</h6></label>
        </div>
        <div>
            <input type="radio" name="startOptions" value="schedule" id="option-schedule" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" for="option-schedule"><h6>Schedule Display</h6></label>
        </div>
        <div ref="scheduleHolder" class="ss-dateTime-picker-holder">
            <div ref="schedulePicker" class="ss-dateTime-pickers">
                <div class="ss-dateTime-picker-row">
                    <p>Starting DateTime: </p>
                    <input type="datetime-local" class="form-control dateTime-picker" :min="currentDateTime" @change="startDateTimePicked" v-model="selectedStartDate">
                </div>
                <div class="ss-dateTime-picker-row">
                    <p>Ending DateTime: </p>
                    <input type="datetime-local" class="form-control dateTime-picker" :min="selectedStartDate" :disabled="disable" @change="endDateTimePicked" v-model="selectedEndDate">
                </div>
            </div>
        </div>
        <!-- Calculated values for selection, uncomment to test -->
        Current Date: {{ currentDateTime }}<br>
        Selected Start Date: {{ selectedStartDate }}<br>
        Selected End Date: {{ selectedEndDate }}<br>
        Done?: {{ choice }}<br>
        {{ dateTime }}
    </div>
</template>

<style scoped>
.ss-holder {
    height: 0;
    padding: 1vh 3vw;
}
.ss-header {
    display: flex;
    margin: 3% 0 5% 2%;
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
	min-height: 2.5rem;
}
.form-control {
    font-size: 3vmin;
    min-width: 95%;
}
h6 {
    margin: 0;
}
p {
    margin: 0 0 0 5%;
}
</style>