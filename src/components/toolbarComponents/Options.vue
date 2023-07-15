<script>
import { store } from '../../Store.js'
import { fabric } from 'fabric'

export default {
    inject: ['BackgroundColor'],

    data() {
        return {
            color: '',
            backgroundColorHex: '',
            imageCount: 0
        }
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
        saveCanvas: function (e) {
            const value = e.target.value
            this.$parent.$parent.$parent.saveCanvas(value)
        },

        selectTemplate(fileEvent) {
            let file = fileEvent.target.files[0]

            if (file.type.indexOf('application/json') !== 0) {
                console.log('Invalid JSON file')
            } 
            else {
                let reader = new FileReader()
                reader.onload = (event) => {
                    try {
                        let json = JSON.parse(event.target.result)
                        this.$parent.$parent.$parent.jsonTemplate(JSON.stringify(json))
                    } catch (error) {
                        console.log('Error parsing JSON file:', error)
                    }
                }
                reader.readAsText(file)
                
            }
        },

        colorChangeEvent(newColor) {
            this.$parent.$parent.$parent.changeCanvasColor(newColor)
        }
    },

    mounted() {
        this.backgroundColorHex = this.currentBackgroundColor
        this.color = this.currentBackgroundColor
    }

}
</script>

<template>
    <div class="options-holder">
        <div class="element-holder">
            <label for="saveCanvas">Save:</label>
            <select name="saveCanvas" id="saveCanvas" v-on:change="saveCanvas">
                <option selected disabled value="">Please select one</option>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="json">JSON</option>
            </select>
        </div>
        <div class="color-holder">
            <h3 class="noselect">Canvas color: {{ backgroundColorHex }}</h3>
            <input ref="colorpicker" v-model="color" type="color">
        </div>
    </div>
    <!-- <div class="element-holder">
        <label class="btn btn-primary canvas-img-insert-btn">
            test template upload
            <input ref="canvasInsertInput" accept='application/JSON' type="file" @change="(env) => selectTemplate(env)" />
        </label>
    </div> -->
</template>

<style scoped>
.options-holder {
    display: flex;
    flex-direction: column;
    gap: 2vh;
}
.element-holder {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 2vh;
    justify-items: center;
    position: relative;
    padding: 1vh 2vw;
    box-sizing: border-box;
}
select {
    width: 80%;
    padding: 5px;
    border-width: 0;
}
.color-holder {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2% 5%;
    background-color: var(--tg-theme-bg-color);
}
h3 {
    color: var(--tg-theme-text-color);
}
input {
    height: 5vh;
    width: 15vw;
    border: none;
    background-color: transparent;
}
input::-webkit-color-swatch{
    border-radius: 0.375rem;
}
</style>