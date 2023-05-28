<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css';
import { fabric } from 'fabric'

export default {
    data() {
        return {
            store,
            //preset click values
            click: 'lightgrey',
            unClick: 'white',
        }
    },

    methods: {
        // Zoom IN, Zoom OUT, FIT to Screen
        selectZoom(option) {
            const zoomInItem = this.$refs.zoomIn
            const zoomOutItem = this.$refs.zoomOut
            const fitScreenItem = this.$refs.fitScreen
            if(option == 0){
                this.uponClick(zoomInItem)
            }
            else if(option == 1){
                this.uponClick(zoomOutItem)
            }
            else{
                this.uponClick(fitScreenItem)
            }
            this.$parent.ZoomInOutCanvas(option)
        },
        // Grab Canvas
        selectGrab() {
            const grabItem = this.$refs.grab
            //unClick
            if (grabItem.style.backgroundColor == this.click){
                grabItem.style.backgroundColor = this.unClick
                this.$parent.GrabCanvas(false)
            }
            //Click
            else{
                grabItem.style.backgroundColor = this.click
                this.$parent.GrabCanvas(true)
            }

        },
        //change div colour
        uponClick(item) {
            item.style.backgroundColor = this.click
            setTimeout(() => {
                item.style.backgroundColor = this.unClick
            }, 100)
        },
    }

}
</script>

<template>
    <div>
        <div class="nb-item" id="zoom-in" @click="selectZoom(0)" ref="zoomIn">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
        </div>
        <div class="nb-item" id="zoom-out" @click="selectZoom(1)" ref="zoomOut">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
        </div>
        <div class="nb-item" id="grab" @click="selectGrab()" ref="grab">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" />
        </div>
        <div class="nb-item" id="fit-screen" @click="selectZoom(2)" ref="fitScreen">
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