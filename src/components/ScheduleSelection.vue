<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
        store,
        options: [
            {_id:0, Description: 'Immediately'},
            {_id:1, Description: 'In 10 Minutes'},
            {_id:2, Description: 'In 1 Hour'}
        ],
        currentDate: '',
        selectedDate: '',
        selectedOption: ''
    }
  },

  methods: {
    selectCard(selection_id) {
        let card = store.availableMSOptions.find(x => x._id === selection_id)

        card.display_variations ? this.$router.push('/VariationSelection') : this.$router.push('/StandardDisplay')
    },

    dateTimePicked() {
        this.selectedOption = 'DateTime'
    }
  },

  mounted() {
    const date = new Date()
    const telegramBackButton = Telegram.WebApp.BackButton
    let currentLocalDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 16)

    telegramBackButton.show()
    telegramBackButton.onClick(() => {
      if (telegramBackButton.isVisible) {
        this.$router.go(-1)
        telegramBackButton.hide()
      }
    }),

    this.currentDate = currentLocalDateTime
    this.selectedDate = currentLocalDateTime
  }

}
</script>

<template>
    <div class="ss-holder">
        <div class="ss-header noselect">
            <img src="../assets/boxedstuffings.png">
            <h2>Schedule Display</h2>
        </div>
        <ui v-for="option in options" :key="option._id">
            <input type="radio" name="options" :value="option.Description" :id="'option_' + option._id" class="btn-check" v-model="selectedOption">
            <label class="btn btn-secondary ss-btn" :for="'option_' + option._id">{{ option.Description }}</label>
        </ui>
        <input type="radio" name="options" value="DateTime" id="option_Date" class="btn-check" v-model="selectedOption">
        <label class="btn btn-secondary ss-btn" for="option_Date">
            Choose Date & Time
            <span>
                <input type="datetime-local" :min="currentDate" class="form-control" @change="dateTimePicked" v-model="selectedDate">
            </span>
        </label>
        Current Date: {{ currentDate }}<br>
        Selected Date: {{ selectedDate }}<br>
        Selected Option: {{ selectedOption }}
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