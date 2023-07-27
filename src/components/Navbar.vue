<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css'


export default {
    name:'Navbar',
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
            <span class='icon1'></span>
        </div>
        <div class="nb-item" id="zoom-out" @click="selectZoom(1)" ref="zoomOut">
            <span class='icon2'></span>
        </div>
        <div class="nb-item" id="fit-screen" @click="selectZoom(2)" ref="fitScreen">
            <span class='icon4'></span>
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
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
}
.icon1 {
    background: url('../assets/icons/navbar/zoom-in.svg');
    height: 20px;
    width: 20px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
.icon2 {
    background: url('../assets/icons/navbar/zoom-out.svg');
    height: 20px;
    width: 20px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
.icon4 {
    background: url('../assets/icons/navbar/fullscreen.svg');
    height: 20px;
    width: 20px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    background-color: red;
    /* Other styles here */
}
</style>