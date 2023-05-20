<script>
import { store } from '../Store.js'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'

import font from '../components/toolbarComponents/Fonts.vue'
import test from '../components/toolbarComponents/test.vue'

export default {
  data() {
    return {
        store,
        bottomSheet: 'font'
    }
  },

  components: {
    VueBottomSheet,
    font,
    test
  },

  methods: {
    selectToolbarOption(toolbarItem) {
        console.log(toolbarItem._id + ': ' + toolbarItem.name)
        this.bottomSheet = toolbarItem.name
        if (toolbarItem._id === 6) {
            this.openBottomSheet()
        }
    },

    pressingDown(selection_id) {
        let item = document.getElementById('toolbar-item-id_' + selection_id)

        item.style.transitionDuration = '0.4s'
        item.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_id) {
        let item = document.getElementById('toolbar-item-id_' + selection_id)

        item.style.transform = 'scale(1)'
        item.style.transitionDuration = '0.2s'
    },

    openBottomSheet() {
        this.$refs.myBottomSheet.open()
    },

    closeBottomSheet() {
        this.$refs.myBottomSheet.close()
    }
  },

}
</script>

<template>
    <div class="tb-holder">
        <ui :id="'toolbar-item-id_' + option._id" class="tb-content" @click="selectToolbarOption(option)" @touchstart="pressingDown(option._id)" @touchend="notPressingDown(option._id)" v-for="option in store.canvasToolbarOptions" :key="option._id">
            <img class="tb-img" src="../assets/boxedstuffings.png">
            <h4 class="tb-name">{{ option.name }}</h4>
        </ui>
        <vue-bottom-sheet ref="myBottomSheet">
            <component :is="bottomSheet" max-height="40%"></component>
        </vue-bottom-sheet>
    </div>
</template>

<style scoped>
.tb-holder {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    justify-content: space-around;
}
.tb-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tb-img {
    height: auto;
    width: 50%;
}
.tb-name {
    margin: 0;
    text-align: center;
    font-size: 1.5vmax;
}
</style>