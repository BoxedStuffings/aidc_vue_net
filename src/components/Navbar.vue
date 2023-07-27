<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css'


export default {
    name: 'Navbar',
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
            if (option == 0) {
                this.uponClick(zoomInItem)
            }
            else if (option == 1) {
                this.uponClick(zoomOutItem)
            }
            else {
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
    },
    
    mounted() {
        store.telegramColorScheme != 'light' ? document.documentElement.style.setProperty('--icon-theme', 'black') : document.documentElement.style.setProperty('--icon-theme', 'white')
    }
}   
</script>

<template>
    <div>
        <div class="nb-item" id="zoom-in" @click="selectZoom(0)" ref="zoomIn">
            <span class='zoomIn'></span>
        </div>
        <div class="nb-item" id="zoom-out" @click="selectZoom(1)" ref="zoomOut">
            <span class='zoomOut'></span>
        </div>
        <div class="nb-item" id="fit-screen" @click="selectZoom(2)" ref="fitScreen">
            <span class='fitScreen'></span>
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
.zoomIn {
    height: 20px;
    width: 20px;
    display: block;
    /* Other styles here */
}
.zoomOut {
    height: 20px;
    width: 20px;
    /* Other styles here */
}
.fitScreen {
    height: 20px;
    width: 20px;
    display: block;
    /* Other styles here */
}
</style>