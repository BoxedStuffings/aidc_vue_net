<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css';

import font from '../components/toolbarComponents/Fonts.vue'
import test from './toolbarComponents/test.vue'

export default {
    data() {
        return {
            store
        }
    },

    components: {
        font,
        test
    },

    methods: {
        selectNavbarOption(navbar_id) {
            //preset colours
            const unClick = 'white'
            const click = 'lightgrey'

            console.log(navbar_id)

            //Ref elements within template
            const zoomInItem = this.$refs.zoomIn
            const zoomOutItem = this.$refs.zoomOut
            const grabItem = this.$refs.grab
            const fitScreenItem = this.$refs.fitScreen

            //Adding into array for easy access 
            const itemArray = [zoomInItem, zoomOutItem, grabItem, fitScreenItem]

            //Change background colour of item
            itemArray.forEach((item, index) => {

                //If Item that is clicked
                if (index == navbar_id) {
                    if (item.style.backgroundColor == click){
                        item.style.backgroundColor = unClick
                    }
                    else{
                        item.style.backgroundColor = click
                    } 
                }

                // Unclick every other item
                else {
                    item.style.backgroundColor = unClick
                }
            })
        }
    }

}
</script>

<template>
    <div>
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
    </div>
</template>

<style scoped>
.nb-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    border: solid grey 1px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: white;
}
</style>