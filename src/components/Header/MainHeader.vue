<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/" class="main-header">My Notes</RouterLink>
    <RouterLink to="/archieved">Archieved</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  padding-block: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-header {
  font-size: var(--heading-1);
  font-weight: bold;
}

nav a {
  text-decoration: none;
  color: black;
  margin-right: 20px;
}
</style>
