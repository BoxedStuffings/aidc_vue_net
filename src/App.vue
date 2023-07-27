<script setup>
import { store } from './Store'

store.initTelegramData(Telegram.WebApp.initDataUnsafe)
// store.initTelegramColor(Telegram.WebApp.colorScheme)
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
