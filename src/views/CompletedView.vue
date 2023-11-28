<script setup lang="ts">
import BlankData from '@/components/Blank/BlankData.vue'
import NoteCard from '@/components/NoteCard/NoteCard.vue'
import { useTodosStore } from '@/stores/todos'
import { computed } from 'vue'

const { todos } = useTodosStore()

const completedTodos = computed(() => {
  return todos.filter((t) => t.isComplete)
})
</script>

<template>
  <div>
    <div v-if="completedTodos.length > 0" class="todos-container">
      <NoteCard
        v-for="todo in completedTodos"
        :key="todo.title"
        :todo="todo"
        :style="{
          backgroundColor: todo.color,
          border: !todo.color ? '1px solid black' : ''
        }"
      />
    </div>
    <BlankData v-else />
  </div>
</template>

<style scoped>
.todos-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  /* margin-block: 3rem; */
}
</style>
