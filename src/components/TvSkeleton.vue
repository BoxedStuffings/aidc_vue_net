<script>
export default {
    data() {
        return {
        }
    },

}
</script>

<template>
    <!-- Main Grid -->
    <div id="tv-grid">
        <!-- Individual cards -->
        <ui class="tv-card noselect" v-for="index in 4" :key="index">
            <!-- Image outline for selection -->
            <div class="tv-card-imageOutline">
                <!-- Display image -->
                <img>
            </div>
            <span></span>
            <p></p>
            <span></span>
            <button></button>
        </ui>
    </div>
</template>

<style scoped>
.tv-card-imageOutline {
    width: 110px;
    padding-top: 45%;
    animation: pulse-bg 1.2s infinite !important;
}
span{
    height: 4px;
    display: block;
}
p{
    width: 40%;
    height: 16px;
    display: block;
    margin-bottom: 10px;
    animation: pulse-bg 1.2s infinite !important;
}
button{
    height: 34px;
    display: block;
    animation: pulse-bg 1.2s infinite !important;
}

@keyframes pulse-bg {
    0% {
        background-color: #8c8c8c;
    }
    50% {
        background-color: #808080;
    }
    100% {
        background-color: #8c8c8c;
    }
}
</style>