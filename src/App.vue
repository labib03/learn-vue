<script setup lang="ts">
import { RouterView } from 'vue-router'
import NewTodosFormVue from './components/Form/NewTodosForm.vue'
import UpdateTodosForm from './components/Form/UpdateTodosForm.vue'
import MainHeader from './components/Header/MainHeader.vue'
</script>

<template>
  <MainHeader />
  <NewTodosFormVue />
  <UpdateTodosForm />
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style global>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
