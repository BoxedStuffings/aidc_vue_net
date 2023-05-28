<script>
import { fabric } from 'fabric'

export default {
  data() {
    return {
        textEditable: new fabric.Textbox('Editable Textbox', {
            width: 500,
            editable: true
        }),

        circle: new fabric.Circle({
            radius: 50,
            fill: 'green',
        }),

        square: new fabric.Rect({
            width: 100, height: 100,
            fill: 'purple',
            angle: 30
        })
    }
  },

  methods: {
    insertElement(element) {
        this.$parent.$parent.$parent.insertElementToCanvas(element)
    }
  }

}
</script>

<template>
    <div class="element-holder">
        <ui class="element-option-card" @click="insertElement(textEditable)">
            <font-awesome-icon icon="fa-solid fa-face-frown-open" beat />
        </ui>
        <ui class="element-option-card" @click="insertElement(square)">
            <font-awesome-icon icon="fa-solid fa-square" />
        </ui>
        <ui class="element-option-card" @click="insertElement(circle)">
            <font-awesome-icon icon="fa-solid fa-circle" />
        </ui>
        <ui class="element-option-card">
            <font-awesome-icon icon="fa-solid fa-face-frown-open" />
        </ui>
    </div>
</template>

<style scoped>
.element-holder {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 2vh;
    justify-items: center;
    position: relative;
    padding: 1vh 2vw;
    box-sizing: border-box;
}
.element-option-card {
    min-height: 42px;
    height: 5vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
}
</style>