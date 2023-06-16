<script>
export default {
    props: {
        scale: Number,
        background: String,
        cross: String,
        darken: String
    }

}
</script>

<template>
    <div class="wrapper">
        <div class="arrow">
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1%;
    scale: v-bind(scale);
}
.wrapper .arrow {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    background: v-bind('background');
}
.wrapper .arrow .line {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 4px;
    border-radius: 2px;
    background: v-bind('cross');
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(45deg);
}
.wrapper .arrow .line:nth-child(2) {
    transform: translate(-50%, -50%) rotate(-45deg);
}
.wrapper:hover .arrow .line, .wrapper:hover .arrow .line:nth-child(2) {
    /* 100% is base line, 85% is slight lightly darker, 25% would be much darker */
    filter: brightness(v-bind(darken));
}
</style>