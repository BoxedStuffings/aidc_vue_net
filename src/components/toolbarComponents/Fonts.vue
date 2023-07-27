<script>
import { store } from '../../Store.js'
import fontfaceobserver from 'fontfaceobserver'

export default {
  data() {
    return {
        store,
        loadedFont: [],
        fontSizeArray: [16,24, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72]
    }
  },

  methods: {
    populateFonts() {
        const fonts = ['Open Sans', 'Pacifico', 'VT323', 'Quicksand', 'Inconsolata', 'Montserrat'];
        fonts.forEach((font) => {
            let option = new Option(font, font)
            this.$refs.fontDropDown.add(option, undefined)
        })
    },

    loadAndUse(font) {
        let url = 'https://fonts.googleapis.com/css?family=' + font.replace(/\s/g,'+') + ':' + '&display=swap'
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.head.append(link)
        this.loadedFont.push(font)

        let fontface = new fontfaceobserver(font)
        fontface.load().then(() => this.$parent.$parent.$parent.setFontFamily(font)).catch((e) => console.log(e))
    },

    closeAllSelect(element) {
        let arrNo = []
        let x = document.getElementsByClassName('select-items')
        let y = document.getElementsByClassName('select-selected')
        for (let i = 0; i < y.length; i++) {
            if (element == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove('select-arrow-active')
            }
        }
        for (let i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide')
            }
        }
    },

    fontChangeEvent(e) {
        this.$parent.$parent.$parent.changeFont(e.srcElement.title)
    },

    alignText(alignment) {
        this.$parent.$parent.$parent.setAlignment(alignment)
    },

    toggleWeight() {
        this.$parent.$parent.$parent.toggleFontWeight()
    },

    toggleItalics() {
        this.$parent.$parent.$parent.toggleItalics()
    },

    toggleLinethrough() {
        this.$parent.$parent.$parent.toggleLinethrough()
    },

    toggleUnderline() {
        this.$parent.$parent.$parent.toggleUnderline()
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
    this.populateFonts()

    // For font select button
    const selectHolder = this.$refs.fontSelect
    const selectElement = this.$refs.fontDropDown
    
    let selectedOptionElement = document.createElement('DIV')
    selectedOptionElement.setAttribute('class', 'select-selected noselect')
    // selectedOptionElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    selectedOptionElement.innerHTML = 'Select Font'
    selectHolder.appendChild(selectedOptionElement)

    let selectDropDown = document.createElement('DIV')
    selectDropDown.setAttribute('class', 'select-items select-hide noselect')
    for (let j = 0; j < selectElement.length; j++) {
        let selectOption = document.createElement('DIV')

        selectOption.innerHTML = selectElement.options[j].innerHTML
        selectOption.addEventListener('click', (e) => {
            let selectDisplay = e.srcElement.parentNode.previousSibling
            for (let i = 0; i < selectElement.length; i++) {
                if (selectElement.options[i].innerHTML == e.srcElement.innerHTML) {
                    selectElement.selectedIndex = i
                    let font = selectElement.value
                    if (this.loadedFont.includes(font)) {
                        this.$parent.$parent.$parent.setFontFamily(font)
                    } else {
                        this.loadAndUse(font)
                    }
                    selectDisplay.innerHTML = e.srcElement.innerHTML
                    let previousSelected = e.srcElement.parentNode.getElementsByClassName('same-as-selected')
                    for (let k = 0; k < previousSelected.length; k++) {
                        previousSelected[k].removeAttribute('class')
                    }
                    e.srcElement.setAttribute('class', 'same-as-selected')
                    break
                }
            }
            selectDisplay.click()
        })
        selectDropDown.appendChild(selectOption)
    }
    selectHolder.appendChild(selectDropDown)

    selectedOptionElement.addEventListener('click', (e) => {
        e.stopPropagation()
        this.closeAllSelect(e.srcElement)
        e.srcElement.classList.toggle('select-open')
        e.srcElement.nextSibling.classList.toggle('select-hide')
        e.srcElement.classList.toggle('select-arrow-active')
    })

  }

}
</script>

<template>
    <div class="font-holder" :style="cssVars">
        <div class="font-row">
            <div class="font-row-bg font-double-row">
                <div ref="fontSelect" class="font-select">
                    <select ref="fontDropDown"></select>
                </div>
                <details class="font-size-select">
                    <summary class="font-size-radios">
                        <input class="font-size-input" type="radio" name="font-size-item" id="default" title="Font Size" checked>
                        <input v-on:change="(e) => fontChangeEvent(e)" class="font-size-input" type="radio" name="font-size-item" :id="i" :title="i" v-for="i in fontSizeArray" :key="i">
                    </summary>
                    <ul class="font-size-list">
                        <li class="font-size-li" v-for="i in fontSizeArray" :key="i">
                            <label class="font-size-label noselect" :for="i">
                                 {{ i }}
                            </label>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-align-options" id="align-left">
                <label class="btn btn-secondary text-btn" for="align-left" @click="alignText('left')">
                    <span class='text-left icon-base'></span>
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-center">
                <label class="btn btn-secondary text-btn" for="align-center" @click="alignText('center')">
                    <span class='text-center icon-base'></span>
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-right">
                <label class="btn btn-secondary text-btn" for="align-right" @click="alignText('right')">
                    <span class='text-right icon-base'></span>
                </label>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="button" class="btn-check" name="text-style-options" id="text-bold">
                <label class="btn btn-secondary text-btn" for="text-bold" @click="toggleWeight()">
                    <span class='type-bold icon-base'></span>
                </label>
                
                <input type="button" class="btn-check" name="text-style-options" id="text-italic">
                <label class="btn btn-secondary text-btn" for="text-italic" @click="toggleItalics()">
                    <span class='type-italic icon-base'></span>
                </label>

                <input type="button" class="btn-check" name="text-style-options" id="text-linethrough">
                <label class="btn btn-secondary text-btn" for="text-linethrough" @click="toggleLinethrough()">
                    <span class='type-strikethrough icon-base'></span>
                </label>

                <input type="button" class="btn-check" name="text-style-options" id="text-underline">
                <label class="btn btn-secondary text-btn" for="text-underline" @click="toggleUnderline()">
                    <span class='type-underline icon-base'></span>
                </label>
            </div>
        </div>
    </div>
</template>

<style>
.font-holder {
    padding: 5%;
    background-color: var(--tg-theme-bg-color);
}
.font-row {
    display: flex;
    justify-content: center;
}
.font-row-bg {
    height: fit-content;
    width: 80%;
    display: grid;
    /* background: rgba(72, 66, 66, 0.2); */
    grid-auto-flow: column;
    /* background-color: var(--tg-theme-hint-color); */
    margin-block: 10px;
    border-radius: 0.375rem;
    padding: 2%;
}
.font-double-row {
    grid-template-columns: 1fr 1fr;
    column-gap: 5%;
}

/* For font select button */
.font-select {
    width: 100%;
    position: relative;
}
.font-select select {
    display: none;
}
.select-selected {
    border-radius: 0.375rem;
    padding-left: 5%;
    background-color: #5c646d;
}
.select-open {
    border-radius: 0.375rem 0.375rem 0 0;
}
/* Style the arrow inside the select element: */
.select-selected:after {
    height: .5rem;
    width: .5rem;
    content: '';
    position: absolute;
    top: 5.5px;
    right: 12px;
	display: inline-block;
	float: right;
	border-bottom: 2px solid currentColor;
	border-left: 2px solid currentColor;
	border-bottom-left-radius: 2px;
    transform-origin: center center;
	transform: rotate(45deg) translate(50%, 0%);
	transition: transform ease-in-out 100ms
}
/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
    transform: rotate(-45deg) translate(0%, 0%);
}
/* style the items (options), including the selected item: */
.select-items div.select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
}
/* Style items (options): */
.select-items {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding-left: 1%;
    background-color: #69727d;
    z-index: 99;
}
.select-items:last-child {
    border-radius: 0 0 0.375rem 0.375rem;
}
/* Hide the items when the select box is closed: */
.select-hide {
    display: none;
}
.select-items div:hover, .same-as-selected {
    background-color: rgba(0, 0, 0, 0.1);
}
/* End of font select button */

/* For font size button */
details.font-size-select {
    width: 100%;
    position: relative;
    margin-right: 1rem;
}
details.font-size-select[open] {
    z-index: 1;
}
summary.font-size-radios {
    padding-inline: 5%;
    border-radius: 0.375rem;
    background-color: #5c646d;
    list-style: none;
}
summary.font-size-radios::-webkit-details-marker {
    display: none;
}
details.font-size-select[open] summary.font-size-radios:before {
    height: 100vh;
    width: 100vw;
    content: '';
    position: fixed;
	top: 0;
	left: 0;
    display: block;
	background: transparent;
}
summary.font-size-radios:after {
    height: .5rem;
    width: .5rem;
    content: '';
    position: absolute;
    top: 5.5px;
    right: 12px;
	display: inline-block;
	float: right;
	border-bottom: 2px solid currentColor;
	border-left: 2px solid currentColor;
	border-bottom-left-radius: 2px;
    transform-origin: center center;
	transform: rotate(45deg) translate(50%, 0%);
	transition: transform ease-in-out 100ms
}
summary.font-size-radios:focus {
    outline: none;
}
details.font-size-select[open] summary.font-size-radios:after {
    transform: rotate(-45deg) translate(0%, 0%);
}
ul.font-size-list {
    max-height: 200px;
    width: 100%;
	position: absolute;
	top: calc(112%);
	left: 0;
    margin: 0;
    border-radius: 0.375rem;
	padding: 5%;
	box-sizing: border-box;
    background: #69727d;
	overflow-y: auto;
}
li.font-size-li {
	margin: 0;
    border-bottom: 1px solid #5c646d;
	padding: .5rem 0;
    list-style: none;
}
li.font-size-li:first-child {
	padding-top: 0;
}
li.font-size-li:last-child {
    border-bottom: none;
	padding-bottom: 0;
}
summary.font-size-radios {
    counter-reset: radios;
}
summary.font-size-radios:before {
    content: var(--selection);
}
input[type=radio].font-size-input {
    display: none;
    color: var(--tg-theme-text-color);
	counter-increment: radios;
	appearance: none;
}
input[type=radio].font-size-input:checked {
	display: inline;
	--display: block;
}
input[type=radio].font-size-input:after {
    display: inline;
	content: attr(title);
	font-size: 1rem;
}
ul.font-size-list {
	counter-reset: labels;
}
label.font-size-label {
	width: 100%;
	display: flex;
	cursor: pointer;
	justify-content: space-between;
}
label.font-size-label span {
    height: 1rem;
    width: 1rem;
	--display: none;
	display: var(--display);
	border: 1px solid #727272;
	border-radius: 3px;
}
/* End of font size button */

.font-btn {
    width: 50%;
    margin-right: 10px;
    color: var(--tg-theme-button-text-color);
    background-color: var(--tg-theme-button-color);
    z-index: 2;
}
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
    color: var(--tg-theme-button-text-color);
    background-color: var(--tg-theme-button-color);
}
.form-control {
    /* background: rgba(72, 66, 66, 0.1) !important; */
    color: var(--tg-theme-text-color) !important;
    background-color: var(--tg-theme-secondary-bg-color) !important;
}
.form-control:focus {
    box-shadow: 0 0 0 0.25rem var(--tg-theme-hint-color);
}
.text-btn {
    margin-inline: 2px;
    font-size: 1.7vmax;
    background-color: var(--tg-theme-button-color) !important;
    color: var(--tg-theme-button-text-color);
}
.icon-base{
    height: 20px;
    width: 100%;
    margin:0;
    display: block;
}
</style>