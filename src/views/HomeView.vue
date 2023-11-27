<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <main>
    <div>
      <h1>Home View</h1>
      <p>{{ counter.count }}</p>
      <button @click="counter.increment">Increment</button>
    </div>
  </main>
</template>
