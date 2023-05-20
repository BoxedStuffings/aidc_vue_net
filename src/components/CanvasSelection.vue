<script>
import { store } from '../Store.js'
import  Toolbar  from './Toolbar.vue'

export default {
  data() {
    return {
        store,
    }
  },

  components: {
    Toolbar,
  },

  methods: {

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
    <div class="cs-holder">
        <toolbar class="toolbar"/>
    </div>
</template>

<style scoped>
.cs-holder {
    height: 100vh;
    width: 100vw;
    position: relative;
}
.toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid black;
    padding-block: 1vh;
}
</style>