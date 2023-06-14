<script>
import { fabric } from 'fabric'

export default {
  data() {
    return {
    }
  },

  methods: {
    createTextEditable() {
        let textEditable = new fabric.Textbox(
            'Editable TextBox',
            {
                width: 100,
                editable: true,
                fill: '#000000'
            }
        )

        this.insertElement(textEditable)
    },

    createCircle() {
        let circle = new fabric.Circle({
            radius: 20,
            fill: 'green'
        })

        this.insertElement(circle)
    },
    
    createSquare() {
        let square = new fabric.Rect({
            height: 50,
            width: 50,
            fill: 'purple',
            angle: 30
        })

        this.insertElement(square)
    },

    insertElement(element) {
        this.$parent.$parent.$parent.insertElementToCanvas(element)
    }
  }

}
</script>

<template>
    <div class="element-holder">
        <ui class="element-option-card" @click="createTextEditable()">
            <font-awesome-icon icon="fa-solid fa-face-frown-open" beat />
        </ui>
        <ui class="element-option-card" @click="createSquare()">
            <font-awesome-icon icon="fa-solid fa-square" />
        </ui>
        <ui class="element-option-card" @click="createCircle()">
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