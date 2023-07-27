<script>
import { store } from '../../Store.js'
import { fabric } from 'fabric'

export default {
  data() {
    return {
        store
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
    },

    colorTheme() {
        if (store.telegramColorScheme == 'light') {
            let spans = document.getElementsByTagName('span')
            for (let i=0;i<spans.length;i++) {
                let style = getComputedStyle(spans[i])
                if (style.background.includes('dark')){
                    let currentTheme = style.background
                    spans[i].style.background = currentTheme.replace('dark', 'light')
                }
            }
        } else {
            let spans = document.getElementsByTagName('span')
            for (let i=0;i<spans.length;i++) {
                let style = getComputedStyle(spans[i])
                if (style.background.includes('light')){
                    let currentTheme = style.background
                    spans[i].style.background = currentTheme.replace('light', 'dark')
                }
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
    <div class="element-holder">
        <ui class="element-option-card" @click="createTextEditable()">
            <span  class='icon1'></span>
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
    height: 30px;
    width: 30px;
    display: block;
    background: url('../../assets/icons/light/elements/type.svg');
    background-repeat: no-repeat;
    background-position: center;
    /* Other styles here */
}
.icon2 {
    height: 30px;
    width: 30px;
    display: block;
    background: url('../../assets/icons/light/elements/square.svg');
    background-repeat: no-repeat;
    background-position: center;
    /* Other styles here */
}
.icon3 {
    height: 30px;
    width: 30px;
    display: block;
    background: url('../../assets/icons/light/elements/circle.svg');
    background-repeat: no-repeat;
    background-position: center;
    /* Other styles here */
}
.icon4 {
    height: 30px;
    width: 30px;
    display: block;
    background: url('../../assets/icons/light/elements/triangle.svg');
    background-repeat: no-repeat;
    background-position: center;
    /* Other styles here */
}
</style>