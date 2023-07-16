<script>
import { store } from '../Store.js'

import BottomSheet from './toolbarComponents/BottomSheet.vue'
import Canvas from './toolbarComponents/Canvas.vue'
import Templates from './toolbarComponents/Templates.vue'
import Elements from './toolbarComponents/Elements.vue'
import Insert from './toolbarComponents/Insert.vue'
import Font from '../components/toolbarComponents/Fonts.vue'
import Color from '../components/toolbarComponents/ColorPicker.vue'
import Options from '../components/toolbarComponents/Options.vue'


export default {
    data() {
        return {
            store,
            bottomSheetContent: 'font',
            textboxSelected: 0
        }
    },

    components: {
        BottomSheet,
        Canvas,
        Templates,
        Elements,
        Insert,
        Font,
        Color,
        Options
    },

    methods: {
        selectToolbarOption(toolbarItem) {
            console.log(toolbarItem._id + ': ' + toolbarItem.name)
            this.bottomSheetContent = toolbarItem.name
            if (toolbarItem._id) {
                this.openBottomSheet()
                this.$parent.fitCanvasToBottomSheet(true)
            }
        },

        editableTextboxSelected(status) {
            this.textboxSelected = status
        },

        pressingDown(selection_ref) {
            let item = this.$refs[selection_ref][0]

            item.style.transform = 'scale(0.95)'
            item.style.transitionDuration = '0.4s'
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
    <div v-if="textboxSelected == 2" class="tb-holder">
        <ui :ref="`tb-item-ref-id_${option._id}`" :id="'toolbar-item-id_' + option._id" class="tb-content" @click="selectToolbarOption(option)" @touchstart="pressingDown(`tb-item-ref-id_${option._id}`)" @touchend="notPressingDown(`tb-item-ref-id_${option._id}`)" v-for="option in store.canvasEditableTexboxOptions" :key="option._id">
            <img class="tb-img noselect" src="../assets/boxedstuffings.png">
            <h4 class="tb-name noselect">{{ option.name }}</h4>
        </ui>
        <BottomSheet ref="bottomSheetRef">
            <component :is="bottomSheetContent"></component>
        </BottomSheet>
    </div>
    <div v-else-if="textboxSelected == 1" class="tb-holder">
        <ui :ref="`tb-item-ref-id_${option._id}`" :id="'toolbar-item-id_' + option._id" class="tb-content" @click="selectToolbarOption(option)" @touchstart="pressingDown(`tb-item-ref-id_${option._id}`)" @touchend="notPressingDown(`tb-item-ref-id_${option._id}`)" v-for="option in store.canvasObjectOptions" :key="option._id">
            <img class="tb-img noselect" src="../assets/boxedstuffings.png">
            <h4 class="tb-name noselect">{{ option.name }}</h4>
        </ui>
        <BottomSheet ref="bottomSheetRef">
            <component :is="bottomSheetContent"></component>
        </BottomSheet>
    </div>
    <div v-else-if="textboxSelected == 0" class="tb-holder">
        <ui :ref="`tb-item-ref-id_${option._id}`" :id="'toolbar-item-id_' + option._id" class="tb-content" @click="selectToolbarOption(option)" @touchstart="pressingDown(`tb-item-ref-id_${option._id}`)" @touchend="notPressingDown(`tb-item-ref-id_${option._id}`)" v-for="option in store.canvasToolbarOptions" :key="option._id">
            <img class="tb-img noselect" src="../assets/boxedstuffings.png">
            <h4 class="tb-name noselect">{{ option.name }}</h4>
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