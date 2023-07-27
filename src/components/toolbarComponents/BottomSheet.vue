<script>
import { store } from '../../Store.js'
import CloseButton from '../Elements/CloseButton.vue'


export default {
    data() {
        return {
            store
        }
    },

    components: {
        CloseButton
    },

    methods: {
        open() {
            let bottomSheet = this.$refs.bsExpendable

            bottomSheet.style.height = '33vh'
        },

        close() {
            let bottomSheet = this.$refs.bsExpendable
            
            this.$parent.bottomSheetContent = 'font'
            bottomSheet.style.height = '0%'
            this.$parent.$parent.fitCanvasToBottomSheet(false)
        },

        colorTheme() {
            let spans = document.getElementsByTagName('span')
            for (let i=0;i<spans.length;i++) {
                if (store.telegramColorScheme == 'light') {
                    spans[i].classList.add(`light-${spans[i].classList[0]}`)
                } else {
                    spans[i].classList.add(`dark-${spans[i].classList[0]}`)
                }
            }
        }

    },

    mounted() {
        this.colorTheme()
    }

}
</script>

<template>
    <div ref="bsExpendable" class="bs-holder">
        <div ref="bsSheet" class="bs-sheet">
            <div class="bs-close-btn-holder">
                <h2 class="noselect" > {{this.$parent.bottomSheetContent}} </h2>
                <CloseButton :scale="1" :background="'transparent'" :cross="'black'" :darken="'85%'" @click="close"></CloseButton>
            </div>
            <slot></slot>
        </div>
    </div>     
</template>

<style scoped>
.bs-holder {
    height: 0;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: var(--tg-theme-bg-color);
    transition-duration: .2s;
    overflow-y: scroll;
    overflow-x: hidden;
    overscroll-behavior: none;
}
.bs-sheet {
    width: 100vw;
    position: relative;
    background-color: var(--tg-theme-bg-color);
}
.bs-close-btn-holder {
    max-height: fit-content;
    height: fit-content;
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 3%;
    background: var(--tg-theme-hint-color);
    border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
    z-index: 10;
}
.bs-close-btn-holder h2 {
    margin: 0;
}

</style>