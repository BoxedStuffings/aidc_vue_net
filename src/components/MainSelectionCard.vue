<script>
import { store } from '../Store.js'

export default {
  data() {
    return {
        store,
        option: this.mainSelectionCard,
    }
  },

  props: {
    mainSelectionCard: Object
  },

  methods: {
    colorTheme() {
        let icon = document.getElementsByTagName('span')
        for (let i=0;i<icon.length;i++) {
            let x = icon[i]

            if (store.telegramColorScheme == 'light') {
                if (x.classList.contains('image')) {
                    x.classList.add('light-imagez')
                } else if (x.classList.contains('video')) {
                    x.classList.add('light-video')
                } else {
                    x.classList.add('light-custom')
                }
            } else {
                if (x.classList.contains('image')) {
                    x.classList.add('dark-imagez')
                } else if (x.classList.contains('video')) {
                    x.classList.add('dark-video')
                } else {
                    x.classList.add('dark-custom')
                }
            }
        }
    }
  },

  mounted() {
    this.colorTheme()
  }
}
</script>

<template>
    <div class="ms-card-holder">
        <div class="ms-card-header">
            <span class="ms-card-icon" :class="{image: option._id == 1, video: option._id == 2, custom: option._id == 3}" ></span>
            <!-- <img class="ms-card-icon" src="../assets/boxedstuffings.png"> -->
            <h2>{{ option.title }}</h2>
        </div>
        <p class="ms-card-description">{{ option.desc }}</p>    
    </div>
</template>

<style scoped>
.ms-card-holder {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ms-card-header {
    display: flex;
    align-items: center;
}
.ms-card-header h2 {
    width: 100%;
    margin-block: 0;
    margin-left: 8px;
    padding: 1%;
    position: relative;
    font-size: 4vmin;
}
.ms-card-icon {
    min-height: 3vh;
    width: 12%;
}
.ms-card-description {
    min-height: 90%;
    margin-block: 0.5rem;
    font-size: 2.5vmin;
}
</style>