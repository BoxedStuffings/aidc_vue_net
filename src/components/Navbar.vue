<script>
import { store } from '../Store.js'
import { VueBottomSheet } from '@webzlodimir/vue-bottom-sheet'
import '@webzlodimir/vue-bottom-sheet/dist/style.css'
import '@fortawesome/fontawesome-free/css/all.css';

import font from '../components/toolbarComponents/Fonts.vue'
import test from './toolbarComponents/Test.vue'


export default {
    data() {
        return {
            store,
        }
    },

    components: {
        font,
        test
    },

    methods: {
        selectNavbarOption(navbar_id) {
            //preset colours
            const unClick = 'white';
            const click = 'lightgrey'

            console.log(navbar_id)
            //Ref elements within template
            const zoomInItem = this.$refs.zoomIn;
            const zoomOutItem = this.$refs.zoomOut;
            const grabItem = this.$refs.grab;
            const fitScreenItem = this.$refs.fitScreen;
            //Adding into array for easy access 
            const itemArray = [zoomInItem, zoomOutItem, grabItem, fitScreenItem]
            //Change background colour of item
            itemArray.forEach((item, index) => {
                //If Item that is clicked
                if (index == navbar_id) {
                    item.style.backgroundColor = click;
                }
                // Unclick every other item
                else {
                    item.style.backgroundColor = unClick;
                }
            });
        }
    },

}
</script>

<template>
    <div class="nb-item" id="zoom-in" @click="selectNavbarOption(0)" ref="zoomIn">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
    </div>
    <div class="nb-item" id="zoom-out" @click="selectNavbarOption(1)" ref="zoomOut">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
    </div>
    <div class="nb-item" id="grab" @click="selectNavbarOption(2)" ref="grab">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
    </div>
    <div class="nb-item" id="fit-screen" @click="selectNavbarOption(3)" ref="fitScreen">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
    </div>
</template>

<style scoped>
.nb-holder {
    display: grid;
    grid-auto-flow: column;
    /* justify-content: space-around; */
}

.nb-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid grey 1px;
    margin-top: 16px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    top: 0;
    background-color: white;
}
</style>