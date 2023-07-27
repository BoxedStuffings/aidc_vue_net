<script>
import { store } from '../../Store.js'
import CloseButton from '../Elements/CloseButton.vue'
import draggable from 'vuedraggable'

export default {
    inject: ['BackgroundColor'],

    data() {
        return {
            store,
            color: '',
            backgroundColorHex: '',
            canvasLayers: [],
            canvasElement: Object,
            canvasKey: String,
        }
    },

    components: {
        CloseButton,
        draggable
    },

    computed: {currentBackgroundColor() {return this.BackgroundColor()}},

    watch: {
        currentBackgroundColor(newValue, oldValue) {
        let value = newValue.substring(0,7)
        this.color = value
        },

        color(newValue, oldValue) {
        let value = newValue.substring(0,7)
        this.colorChangeEvent(value)
        this.backgroundColorHex = value
        }
    },

    methods: {
        updateLayers(e) {
            let movement = e.moved.newIndex - e.moved.oldIndex
            let element = e.moved.element.Object
            let layerArray = this.canvasLayers.slice().reverse()
            if (movement >= 0) {
                // Send backwards
                this.$parent.$parent.$parent.editCanvasObject(element, Math.abs(movement), false, layerArray)
            } else {
                // Bring forwards
                this.$parent.$parent.$parent.editCanvasObject(element, Math.abs(movement), true, layerArray)
            }
        },

        colorChangeEvent(newColor) {
            this.$parent.$parent.$parent.changeCanvasColor(newColor)
        }

    },

    mounted() {
        this.backgroundColorHex = this.currentBackgroundColor
        this.color = this.currentBackgroundColor
        this.canvasLayers = store.canvasObjects.slice().reverse()
    }

}
</script>

<template>
    <div v-if="!canvasLayers.length > 0">
        <div class="color-holder">
            <h6 class="noselect">Color: {{ backgroundColorHex }}</h6>
            <input ref="colorpicker" v-model="color" type="color">
        </div>
        <div :style="{'text-align':'center', 'padding-top':'2%'}">
            <p>There are no elements on the canvas right now.</p>
        </div>
    </div>
    <div v-else>
        <div class="color-holder">
            <h6 class="noselect">Color: {{ backgroundColorHex }}</h6>
            <input ref="colorpicker" v-model="color" type="color">
        </div>
        <p>Change the element layering by dragging and dropping the elements here.</p>
        <div class="canvas-holder">
            <draggable :list="canvasLayers" class="list-group" @change="updateLayers">
                <template #item="{ element }">
                    <div class="canvas-item">
                        <h6 class="noselect">{{ element.Name }}</h6>
                        <div class="canvas-rename-button"><span class='light-grip-vertical image-base'></span></div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<style scoped>
.color-holder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 2% 5%;
    background-color: var(--tg-theme-bg-color);
}
h6 {
    margin: 0;
    color: var(--tg-theme-text-color);
}
input {
    height: 3.5vh;
    width: 30vw;
    margin-left: 2%;
    border: none;
    background-color: transparent;
}
input::-webkit-color-swatch{
    border: 1px;
    border-radius: 0.375rem;
}
.canvas-holder {
    display: flex;
    flex-direction: column;
    padding: 3% 5%;
    background-color: var(--tg-theme-bg-color);
}
.canvas-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1%;
    color: var(--tg-theme-text-color);
    text-decoration: none;
    background-color: #3A3A3A;
    border: 1px solid var(--tg-theme-secondary-bg-color);
}
.canvas-item .canvas-rename-button {
    padding-right: 3%;
}
.canvas-item:first-child {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
}
.canvas-item:last-child {
    border-bottom-right-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
}
.image-base {
    height: 20px;
    width: 20px;
    display: block;
}
p {
    margin: 3% 0 0 0;
    padding-inline: 5%;
}
h6 {
    margin: 1%;
    padding-left: 2%;
}
</style>