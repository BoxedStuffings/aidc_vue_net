<script setup>
import { store } from './Store'

store.initTelegramData(Telegram.WebApp.initDataUnsafe)
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
