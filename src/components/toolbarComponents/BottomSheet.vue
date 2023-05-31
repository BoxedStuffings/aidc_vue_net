<script>
export default {
  data() {
    return {
    }
  },

  methods: {
    open() {
        const bottomSheet = this.$refs.bsExpendable

        bottomSheet.style.height = '33vh'
    },

    close() {
        const bottomSheet = this.$refs.bsExpendable

        bottomSheet.style.height = '0%'
        this.$parent.$parent.fitCanvasToBottomSheet(false)
    }
  }

}
</script>

<template>
    <div ref="bsExpendable" class="bs-holder">
        <div class="bs-sheet">
            <div class="bs-close-btn-holder">
                <button type="button" class="btn-close bs-close-btn" @click="close"></button>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.bs-holder {
    height: 0;
    width: 100%;
    position: absolute;
    bottom: 0;
    overflow: scroll;
    /* display: flex;
    justify-content: center; */
    transition-duration: .2s;
}
/* .bs-sheet {
    height: 100%;
    width: 100vw;
    position: relative;
    background: white;
    overflow: scroll;
    background-color: var(--tg-theme-bg-color);

} */
.bs-close-btn-holder {
    max-height: fit-content;
    height: fit-content;
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: right;
    background: var(--tg-theme-hint-color);
    border-bottom: 1px solid var(--tg-theme-secondary-bg-color);
    z-index: 10;
}
.bs-close-btn {
    margin: 2%;
    color: var(--tg-theme-hint-color);
}
slot{
    position: absolute;
    top: 20px;
}
</style>