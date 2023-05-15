<script>

export default {
  data() {
    return {
        option: this.mainSelectionCard
    }
  },

  props: {
    mainSelectionCard: Object
  },

}
</script>

<template>
    <div class="ms-card-holder">
        <div class="ms-card-header">
            <img class="ms-card-icon" src="../assets/boxedstuffings.png">
            <h2>{{ option.title }}</h2>
        </div>
        <p class="ms-card-description">{{ option.desc }}</p>    
    </div>
</template>

<style scoped>

.ms-card-holder {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.ms-card-header {
    display: flex;
    align-items: center;
}
.ms-card-header h2 {
    width: 100%;
    margin-block: 0;
    padding: 1%;
    font-size: 4vmin;
}
.ms-card-icon {
    height: 100%;
    width: 8vw;
    object-fit: cover;
    border-radius: 8px;
}
.ms-card-description {
    min-height: 90%;
    margin-block: 0.5rem;
    font-size: 2.5vmin;
}
</style>