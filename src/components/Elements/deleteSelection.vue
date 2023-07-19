<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css';

export default {
    data() {
        return {
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
    }

}
</script>

<template>
    <div>
        <image></image>
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