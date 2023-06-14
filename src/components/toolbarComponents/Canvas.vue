<script>
import { store } from '../../Store.js'

export default {
  data() {
    return {
        canvasLayers: {},
        canvasElement: Object
    }
  },

  methods: {
    test(element, toggle) {
        this.$refs.canvasEdit.classList.toggle('open')
        if (toggle) {
            this.canvasElement = element
        } else {

        }
    },

    changeLayer(option) {
        this.$parent.$parent.$parent.changeElementLayer(this.canvasElement, option)
    }
  },

  mounted() {
    this.canvasLayers = store.canvasObjects
  }
}

</script>

<template>
    <div class="canvas-holder">
        <div ref="canvasEdit" class="canvas-edit">
            <div class="canvas-edit-box">
                <div class="canvas-edit-box-close">
                    <button type="button" class="btn-close canvas-edit-box-close-btn" @click="test(null, false)"></button>
                </div>
                <div class="canvas-edit-box-options">
                    <ui class="canvas-edit-box-option" @click="changeLayer(1)"><h5>Bring Foward</h5></ui>
                    <ui class="canvas-edit-box-option" @click="changeLayer(2)"><h5>Send Backwards</h5></ui>
                    <ui class="canvas-edit-box-option" @click="changeLayer(3)"><h5>Bring to Front</h5></ui>
                    <ui class="canvas-edit-box-option" @click="changeLayer(4)"><h5>Send to Back</h5></ui>
                </div>
            </div>
        </div>
        <ui class="canvas-ui" v-for="value, key in canvasLayers" :key="key">
            <details class="canvas-layer" @click="test(value, true)">
                <summary class="canvas-layer-details">{{ key }}</summary>
            </details>
        </ui>
    </div>
</template>

<style scoped>
.canvas-holder {
    display: flex;
    flex-direction: column;
    padding: 5%;
    background-color: var(--tg-theme-bg-color);
}
.canvas-edit {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    background-color: transparent;
    z-index: 99;
}
.open{
    visibility: visible;
}
.canvas-edit-box {
    height: 60vh;
    width: 80vw;
    border-radius: 0.375rem;
    background-color: var(--tg-theme-bg-color);
}
.canvas-edit-box-close {
    display: flex;
    justify-content: flex-end;
}
.canvas-edit-box-close-btn {
    margin: 3%;
    color: var(--tg-theme-hint-color);
}
.canvas-edit-box-options {
    display: flex;
    flex-direction: column;
    padding-inline: 5%;
}
.canvas-edit-box-option {
    margin-block: 1%;
    border-radius: 0.375rem;
    padding: 1%;
    background-color: #69727d;
}
h5 {
    margin: 0;
}
.canvas-ui {
    margin: 0.7%;
}
.canvas-layer-details {
    position: relative;
    border-radius: 0.375rem;
    padding: 1% 1.5%;
    list-style: none;
    border: 1px solid black;
}
.canvas-layer-details:after{
    height: .5rem;
    width: .5rem;
    content: '';
    position: absolute;
    top: 13.5px;
    right: 25px;
	display: inline-block;
	float: right;
	border-bottom: 2px solid currentColor;
	border-left: 2px solid currentColor;
	border-bottom-left-radius: 2px;
    transform-origin: center center;
	transform: rotate(45deg) translate(50%, 0%);
	transition: transform ease-in-out 100ms
}
</style>