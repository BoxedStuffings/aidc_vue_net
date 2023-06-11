<script>
import fontfaceobserver from 'fontfaceobserver'

export default {
  data() {
    return {
        loadedFont: [],
    }
  },

  methods: {
    populateFonts() {
        const fonts = ['Open Sans', 'Pacifico', 'VT323', 'Quicksand', 'Inconsolata'];
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
    }

  },

  mounted() {
    this.populateFonts()

    // For font select button
    const selectHolder = this.$refs.fontSelect
    const selectElement = this.$refs.fontDropDown
    
    let selectedOptionElement = document.createElement('DIV')
    selectedOptionElement.setAttribute('class', 'select-selected noselect')
    selectedOptionElement.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    selectHolder.appendChild(selectedOptionElement)

    let selectDropDown = document.createElement('DIV')
    selectDropDown.setAttribute('class', 'select-items select-hide noselect')
    for (let j = 1; j < selectElement.length; j++) {
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
        e.srcElement.nextSibling.classList.toggle('select-hide')
        e.srcElement.classList.toggle('select-arrow-active')
    })
  }

}
</script>

<template>
    <div class="font-holder" :style="cssVars">
        <div class="font-row">
            <div class="font-row-bg">
                <div ref="fontSelect" class="font-select">
                    <select ref="fontDropDown"></select>
                </div>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-align-options" id="align-left">
                <label class="btn btn-secondary text-btn" for="align-left" @click="alignText('left')">
                    <font-awesome-icon icon="fa-solid fa-align-left" />
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-center">
                <label class="btn btn-secondary text-btn" for="align-center" @click="alignText('center')">
                    <font-awesome-icon icon="fa-solid fa-align-center" />
                </label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-right">
                <label class="btn btn-secondary text-btn" for="align-right" @click="alignText('right')">
                    <font-awesome-icon icon="fa-solid fa-align-right" />
                </label>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="button" class="btn-check" name="text-style-options" id="text-bold">
                <label class="btn btn-secondary text-btn" for="text-bold" @click="toggleWeight()">
                    <font-awesome-icon icon="fa-solid fa-bold" />
                </label>
                
                <input type="button" class="btn-check" name="text-style-options" id="text-italic">
                <label class="btn btn-secondary text-btn" for="text-italic" @click="toggleItalics()">
                    <font-awesome-icon icon="fa-solid fa-italic" />
                </label>

                <input type="button" class="btn-check" name="text-style-options" id="text-hold">
                <label class="btn btn-secondary text-btn" for="text-hold" @click="toggleLinethrough()">
                    <font-awesome-icon icon="fa-solid fa-face-frown-open" />
                </label>

                <input type="button" class="btn-check" name="text-style-options" id="text-underline">
                <label class="btn btn-secondary text-btn" for="text-underline" @click="toggleUnderline()">
                    <font-awesome-icon icon="fa-solid fa-underline" />
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
    background-color: var(--tg-theme-hint-color);
    margin-block: 8px;
    border-radius: 0.375rem;
    padding: 2%;
}

/* For font select button */
.font-select {
    width: 50%;
    position: relative;
}
.font-select select {
    display: none;
}
.select-selected {
    background-color: #5c646d;
}
/* Style the arrow inside the select element: */
.select-selected:after {
  position: absolute;
  content: "";
  top: 10px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
  transition-duration: .3s;
}
/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 3px;
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
  background-color: #69727d;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}
/* Hide the items when the select box is closed: */
.select-hide {
  display: none;
}
.select-items div:hover, .same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}
/* End of font select button */

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
</style>