<script>
import { store } from '../Store.js'

import BottomSheet from './toolbarComponents/BottomSheet.vue'
import font from '../components/toolbarComponents/Fonts.vue'
import test from './toolbarComponents/test.vue'

export default {
  data() {
    return {
        store,
        bottomSheetContent: 'font'
    }
  },

  components: {
    BottomSheet,
    font,
    test
  },

  methods: {
    selectToolbarOption(toolbarItem) {
        console.log(toolbarItem._id + ': ' + toolbarItem.name)
        this.bottomSheetContent = toolbarItem.name
        if (toolbarItem._id === 6) {
            this.openBottomSheet()
            this.$parent.fitCanvasToBottomSheet(true)
        }
    },

    pressingDown(selection_ref) {
        let item = this.$refs[selection_ref][0]

        item.style.transitionDuration = '0.4s'
        item.style.transform = 'scale(0.95)'
    },

    notPressingDown(selection_ref) {
        let item = this.$refs[selection_ref][0]

        item.style.transform = 'scale(1)'
        item.style.transitionDuration = '0.2s'
    },

    openBottomSheet() {
        this.$refs.bottomSheetRef.open()
    },

    closeBottomSheet() {
        this.$refs.bottomSheetRef.close()
    }
  },

}
</script>

<template>
    <div class="tb-holder">
        <ui :ref="`tb-item-ref-id_${option._id}`" :id="'toolbar-item-id_' + option._id" class="tb-content" @click="selectToolbarOption(option)" @touchstart="pressingDown(`tb-item-ref-id_${option._id}`)" @touchend="notPressingDown(`tb-item-ref-id_${option._id}`)" v-for="option in store.canvasToolbarOptions" :key="option._id">
            <img class="tb-img" src="../assets/boxedstuffings.png">
            <h4 class="tb-name">{{ option.name }}</h4>
        </ui>
        <BottomSheet ref="bottomSheetRef">
            <component :is="bottomSheetContent"></component>
        </BottomSheet>
    </div>
</template>

<style scoped>
.tb-holder {
    display: flex;
    background: var(--tg-theme-bg-color) !important;
}
.tb-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.tb-img {
    height: 50%;
}
.tb-name {
    margin: 0;
    text-align: center;
    font-size: 1.4vmax;
}
</style>