<script>
import { store } from '../../Store.js'
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
            fill: '#000000'
        })
        
        this.insertElement(circle)
    },
    
    createSquare() {
        let square = new fabric.Rect({
            height: 50,
            width: 50,
            fill: '#000000',
            angle: 30
        })

        this.insertElement(square)
    },

    createLine() {
        let line = new fabric.Line(
            [50, 100, 200, 200], {
            stroke: '#000000'
        })
        
        this.insertElement(line)
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
            <span class='icon1'></span>
        </ui>
        <ui class="element-option-card" @click="createSquare()">
            <span class='icon2'></span>
        </ui>
        <ui class="element-option-card" @click="createCircle()">
            <span class='icon3'></span>
        </ui>
        <ui class="element-option-card" @click="createLine()">
            <span class='icon4'></span>
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
.icon1 {
    background: url('../../assets/icons/elements/type.svg');
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
.icon2 {
    background: url('../../assets/icons/elements/square.svg');
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
.icon3 {
    background: url('../../assets/icons/elements/circle.svg');
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
.icon4 {
    background: url('../../assets/icons/elements/triangle.svg');
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    display: block;
    background-position: center;
    /* Other styles here */
}
</style>