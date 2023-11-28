<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { useToggleStore } from '@/stores/toggle'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string | string[]
}>()

const toggle = useToggleStore()
const todos = useTodosStore()
const router = useRouter()

const deleteTodo = () => {
  if (typeof props.id === 'string') {
    todos.deleteTodo(props.id)
    router.replace('/')
    toggle.toggleConfirmationModal()
  }
}
</script>

<template>
  <Transition>
    <div v-if="toggle.modal.confirmation" class="overlay">
      <div class="content">
        <h1>Delete Note</h1>
        <p>Are you sure want to delete this note ?</p>
        <div class="btn-container">
          <button class="btn" @click="toggle.toggleConfirmationModal">Nooo</button>
          <button class="btn danger" @click.prevent="deleteTodo">Yeah Sure</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.content {
  background-color: white;
  padding-inline: 25px;
  padding-block: 18px;
  border-radius: 10px;
}

.btn-container {
  display: flex;
  gap: 7px;
  margin-top: 12px;
}

.btn {
  outline: none;
  border: none;
  padding-inline: 10px;
  padding-block: 8px;
  border-radius: 10px;
  background-color: #f1f5f9;
  border: 1px solid transparent;
  color: black;
}

.btn:hover {
  cursor: pointer;
}

.danger {
  border: 1px solid transparent;
  background-color: #fca5a5;
  color: #dc2626;
}
</style>
