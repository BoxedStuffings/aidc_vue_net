<script>
import { store } from '../Store.js'
import '@fortawesome/fontawesome-free/css/all.css'


export default {
    name: 'Navbar',
    data() {
        return {
            store,
            click: 'lightgrey',
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
            let currentBgColor = item.style.backgroundColor
            item.style.backgroundColor = this.click
            setTimeout(() => {
                item.style.backgroundColor = currentBgColor
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
            <span class='zoomIn icon-base'></span>
        </div>
        <div class="nb-item" id="zoom-out" @click="selectZoom(1)" ref="zoomOut">
            <span class='zoomOut icon-base'></span>
        </div>
        <div class="nb-item" id="fit-screen" @click="selectZoom(2)" ref="fitScreen">
            <span class='fitScreen icon-base'></span>
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
    background-color: var(--tg-theme-bg-color);
}
.icon-base {
    height: 20px;
    width: 20px;
    display: block;
}
</style>