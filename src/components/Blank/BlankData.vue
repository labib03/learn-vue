<template>
  <div class="blank">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
const { msg } = defineProps<{
  msg?: string
}>()

let message = msg || 'No Data Record'
</script>

<style scoped></style>
