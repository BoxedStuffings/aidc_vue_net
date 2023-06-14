<script>

export default {
  inject: ['textboxActiveColor'],

  data() {
    return {
      color: '',
      activeObjectColorHex: ''
    }
  },

  computed: {activeObjectColor(){return this.textboxActiveColor()}},

  watch: {
    activeObjectColor(newValue, oldValue) {
      let value = newValue.substring(0,7)
      this.color = value
    },

    color(newValue, oldValue) {
      let value = newValue.substring(0,7)
      this.colorChangeEvent(value)
      this.activeObjectColorHex = value
    }
  },

  methods: {
    colorChangeEvent(newColor) {
      this.$parent.$parent.$parent.changeColor(newColor)
    }
  },

  mounted() {
    this.activeObjectColorHex = this.activeObjectColor
    this.color = this.activeObjectColor
  }
}

</script>

<template>
    <div class="color-holder">
      <h2>Current color: {{ activeObjectColorHex }}</h2>
      <input ref="colorpicker" v-model="color" type="color">
    </div>
</template>

<style scoped>
.color-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2% 5%;
  background-color: var(--tg-theme-bg-color);
}
h2 {
  color: var(--tg-theme-text-color);
}
input {
  height: 5vh;
  width: 15vw;
  border: none;
}
</style>