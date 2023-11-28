<script setup lang="ts">
import type { TodosType } from '@/stores/todos'
import dayjs from 'dayjs'
import { RouterLink } from 'vue-router'

const { todo } = defineProps<{ todo: TodosType }>()
</script>

<template>
  <RouterLink :to="todo.id" class="todo-card">
    <small class="date">{{ dayjs(todo.when).locale('id').format('HH:mm, DD MMMM') }}</small>
    <h1>{{ todo.title }}</h1>
    <p>{{ todo.content }}</p>
  </RouterLink>
</template>

<style scoped>
.todo-card {
  max-width: 280px;
  max-height: 400px;
  height: max-content;
  overflow-y: auto;
  padding-block: 18px;
  padding-bottom: 21px;
  padding-inline: 16px;
  border-radius: 18px;
  white-space: pre-wrap;
  color: black;
  /* word-break: break-all; */
  overflow-wrap: break-word;
  hyphens: manual;
  text-decoration: none;
}

.todo-card:hover {
  cursor: pointer;
}

.todo-card h1 {
  line-height: 35px;
  width: auto;
  height: auto;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.todo-card p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>
