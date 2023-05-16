<script>

export default {
  data() {
    return {
      option: this.card,
    }
  },

  props: {
    card: Object
  },

}
</script>

<template>
  <div class="card">
    <img class="card-img-top card-img" src="../assets/boxedstuffings.png">
    <div class="card-body">
      <h1 class="card-title">{{ option.name }}</h1>
      <p class="card-text">{{ option.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card{
  margin-top: 2vh;
  background-color: var(--tg-theme-bg-color);
}
.card-img {
  max-height: 45vh;
  border-radius: 0.8rem;
  padding: 2%;
}
.card-body{
  font-size: 2.5vmin;
}

@media (prefers-color-scheme: dark) {
  .card {
    border: 1px solid rgba(255, 255, 255, 0.173)
  }
}
</style>