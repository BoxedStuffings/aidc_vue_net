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
            <span class='icon1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    <path
                        d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                    <path fill-rule="evenodd"
                        d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                </svg>
            </span>
        </div>
        <div class="nb-item" id="zoom-out" @click="selectZoom(1)" ref="zoomOut">
            <span class='icon2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-out"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                    <path
                        d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                    <path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
            </span>
        </div>
        <div class="nb-item" id="fit-screen" @click="selectZoom(2)" ref="fitScreen">
            <span class='icon4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z" />
                </svg></span>
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
svg {
    color: var(--icon-theme);
    display: block;
    height: 18px;
    width: 18px;
    align-content: center;
    justify-items: center;
}
span{
    padding: 0;
}</style>