<script>

export default {
  data() {
    return {
        font: 'Select'
    }
  }

}
</script>

<template>
    <div class="font-holder">
        <h2>Font</h2>
        <div class="font-row">
            <div class="font-row-bg">
                <button class="btn btn-outline-secondary dropdown-toggle font-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ font }}</button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="font = 'Font Option 1'">Font Option 1</a></li>
                    <li><a class="dropdown-item" @click="font = 'Font Option 2'">Font Option 2</a></li>
                    <li><a class="dropdown-item" @click="font = 'Font Option 3'">Font Option 3</a></li>
                </ul>
                <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="">
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-align-options" id="align-left">
                <label class="btn btn-secondary text-btn" for="align-left">Left-Align</label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-center">
                <label class="btn btn-secondary text-btn" for="align-center">Center-Align</label>

                <input type="radio" class="btn-check" name="text-align-options" id="align-right">
                <label class="btn btn-secondary text-btn" for="align-right">Right-Align</label>
            </div>
        </div>
        <div class="font-row">
            <div class="font-row-bg">
                <input type="radio" class="btn-check" name="text-style-options" id="text-bold">
                <label class="btn btn-secondary text-btn" for="text-bold">Bold</label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-italic">
                <label class="btn btn-secondary text-btn" for="text-italic">Italic</label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-hold">
                <label class="btn btn-secondary text-btn" for="text-hold">idkwhatthisis</label>

                <input type="radio" class="btn-check" name="text-style-options" id="text-underline">
                <label class="btn btn-secondary text-btn" for="text-underline">Underline</label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.font-holder {
    padding: 5%;
}
.font-row {
    display: flex;
    justify-content: center;
}
.font-row-bg {
    height: fit-content;
    width: fit-content;
    display: flex;
    justify-content: space-between;
    background: var(--tg-theme-button-text-color) !important;
    /* background: rgba(72, 66, 66, 0.2); */
    margin-block: 8px;
    border-radius: 0.375rem;
    padding: 2%;
}
.font-btn {
    width: 50%;
    margin-right: 10px;
    z-index: 2;
}
.form-control {
    background: rgba(72, 66, 66, 0.1) !important;
}
.text-btn {
    margin-inline: 2px;
    font-size: 1.7vmax;
}
</style>