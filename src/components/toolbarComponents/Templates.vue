<script>
import { store } from '../../Store.js'
import  mainSelectionCardComponent from '../MainSelectionCard.vue'

export default {
  data() {
    return {
      store
    }
  },

  components: {
    mainSelectionCardComponent
  },

  methods: {
    selectCard(json) {
      this.$parent.$parent.$parent.loadTemplate(JSON.stringify(json))
    },

    pressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transform = 'scale(0.95)'
      card.style.transitionDuration = '0.4s'
    },

    notPressingDown(selection_ref) {
      let card = this.$refs[selection_ref][0]

      card.style.transform = 'scale(1)'
      card.style.transitionDuration = '0.2s'
    },
  }
}
</script>

<template>
  <div class="template-holder" v-if="store.canvasTemplates.length != 0">
    <ui class="template-card" :ref="`template_${option._id}`" @click="selectCard(option.json)" @touchstart="pressingDown(`template_${option._id}`)" @touchend="notPressingDown(`template_${option._id}`)" v-for="option in store.canvasTemplates" :key="option._id">
      <img class="template-card-icon noselect" :src="option.image">
    </ui>
  </div>
  <div class="template-holder" v-else>
    <p>There is either no templates or the templates are not loaded, please wait...</p>
  </div>
</template>

<style scoped>
.template-holder {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
}
.template-card {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1%;
}
.template-card-icon {
  height: auto;
  width: 90%;
}
p {
  margin: 0;
  padding-left: 5%;
}
</style>