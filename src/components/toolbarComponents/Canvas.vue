<script>
import { store } from '../../Store.js'
import CloseButton from '../Elements/CloseButton.vue'
import draggable from 'vuedraggable'

export default {
    name: "simple",
    display: "Simple",
    order: 0,
    data() {
        return {
            canvasLayers: [],
            canvasElement: Object,
            canvasKey: String,
        }
    },

    components: {
        CloseButton,
        draggable
    },

    methods: {

        test(e) {
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
        }
    },

    mounted() {
        this.canvasLayers = store.canvasObjects.slice().reverse()
        console.log(this.canvasLayers.length)
    }

}
</script>

<template>
    <div v-if="!canvasLayers.length > 0">
        <div :style="{'text-align':'center', 'padding-top':'2%'}">
            <h3>There are no elements on the canvas right now.</h3>
        </div>
    </div>
    <div v-else>
        <h4>Change the element layering by dragging and dropping the elements here.</h4>
        <div class="canvas-holder">
            <draggable :list="canvasLayers" class="list-group" @change="test">
                <template #item="{ element }">
                    <div class="canvas-item">
                        <h5 class="noselect">{{ element.Name }}</h5>
                        <div class="canvas-rename-button"><font-awesome-icon icon="fa-solid fa-i-cursor" /></div>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<style scoped>
.canvas-holder {
    display: flex;
    flex-direction: column;
    padding: 1% 10%;
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
h4 {
 padding-inline: 3.5%;
}
h5 {
    margin: 1%;
}
</style>