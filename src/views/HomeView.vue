<script setup lang="ts">
import { computed } from 'vue'
import BlankData from '@/components/Blank/BlankData.vue'
import NoteCard from '@/components/NoteCard/NoteCard.vue'
import { useTodosStore } from '@/stores/todos'
import { useToggleStore } from '@/stores/toggle'

const toggle = useToggleStore()
const todos = useTodosStore()

const uncompleteTodo = computed(() => {
  return todos.todos.filter((t) => !t.isComplete)
})
</script>

<template>
  <main>
    <button class="btn-new-todos" @click="toggle.toggleFormNewTodos">Add New Todos</button>
    <div v-if="uncompleteTodo.length > 0" class="todos-container">
      <NoteCard
        v-for="todo in uncompleteTodo"
        :key="todo.title"
        :todo="todo"
        :style="{
          backgroundColor: todo.color,
          border: !todo.color ? '1px solid black' : ''
        }"
      />
    </div>
    <BlankData v-else class="blank" />
  </main>
</template>

<style scoped>
.todos-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-block: 3rem;
}

.btn-new-todos {
  padding-block: 9px;
  padding-inline: 12px;
  outline: none;
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.btn-new-todos:hover {
  cursor: pointer;
}
.btn-new-todos:active {
  box-shadow: none;
  border: 1px solid transparent;
}

.btn-new-todos:focus-visible {
  border: 1px solid black;
}

.date {
  font-size: smaller;
}

.blank {
  margin-top: 2rem;
}
</style>
