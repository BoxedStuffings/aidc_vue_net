<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
        store,
        options: [
            {_id: 0, Description: 'Immediately'},
            {_id: 1, Description: 'In 10 Minutes'},
            {_id: 2, Description: 'In 1 Hour'}
        ],
        currentDate: String,
        selectedDate: '',
        selectedOption: {},
        calculate: ''
    }
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
    }
  },

  methods: {
    formatDateTime(dateTime) {
        return new Date(dateTime).toISOString().substring(0, 19) // to 16
    },

    dateTimePicked() {
        this.selectedOption = {_id: 3, Description: 'DateTime'}
    },

    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
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
    <div class="ss-holder">
        <div class="ss-header noselect">
            <img src="../assets/boxedstuffings.png">
            <h2>Schedule Display</h2>
        </div>
        <!-- Options -->
        <ui v-for="option in options" :key="option._id">
            <input type="radio" name="options" :value="option" :id="'option_' + option._id" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" :for="'option_' + option._id">{{ option.Description }}</label>
        </ui>
        <!-- DateTime selector -->
        <input type="radio" name="options" :value="{_id: 3, Description: 'DateTime'}" id="option_Date" class="btn-check" v-model="selectedOption">
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

<style scoped>
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
    margin-block: 1%;
    text-align: left;
    font-size: 3vmin;
}
.form-control {
    font-size: 3vmin;
    min-width: 95%;
}
</style>