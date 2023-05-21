<script>
export default {
  data() {
    return {
    }
  },

  methods: {
    open() {
        const bottomSheet = this.$refs.bsExpendable

        bottomSheet.style.height = '30vh'
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
        <div class="bs-bg">
            <div class="bs-sheet">
                <button type="button" class="btn-close bs-close-btn" @click="close"></button>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bs-holder {
    height: 0;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    transition-duration: .2s;
}
.bs-sheet {
    height: 100%;
    width: 100vw;
    position: relative;
    background: white;
    overflow: scroll;
}
.bs-close-btn {
    position: absolute;
    right: 0;
    margin: 2%;
}
</style>