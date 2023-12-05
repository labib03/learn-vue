<script setup lang="ts">
import UpdateTodosForm from '@/components/Form/UpdateTodosForm.vue'
import ConfirmationModal from '@/components/Modals/ConfirmationModal.vue'
import { useTodosStore } from '@/stores/todos'
import { useToggleStore } from '@/stores/toggle'
import { convertDate } from '@/utils/text-manipulation'
import { ChevronLeft } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { params } = useRoute()
const router = useRouter()
const todos = useTodosStore()
const toggleStore = useToggleStore()

const detailTodo = computed(() => {
  return todos.findTodoById(params.todo)
})

function toggle() {
  todos.toggleCompeleted(detailTodo.value?.id as string)
}

function showFormUpdate() {
  toggleStore.toggleFormUpdateTodos()
}

function showConfirmationModal() {
  toggleStore.toggleConfirmationModal()
}

function back() {
  router.back()
}
</script>

<template>
  <UpdateTodosForm />
  <ConfirmationModal :id="params.todo" />

  <header class="header-container">
    <button @click="back" class="btn-back hover">
      <ChevronLeft color="black" :size="32" class="icon-back" />
      <p>Back</p>
    </button>
  </header>

  <div class="container">
    <div class="heading">
      <div
        :style="{
          backgroundColor: detailTodo?.color,
          border: !detailTodo?.color ? '1px solid black' : ''
        }"
        class="circle-color"
      />
      <h1>{{ detailTodo?.title }}</h1>
    </div>

    <div class="btn-container">
      <button class="btn" @click="toggle">
        {{ detailTodo?.isComplete ? 'Unarchieved' : 'Archieved' }}
      </button>
      <button class="btn" @click.prevent="showFormUpdate">Update</button>
      <button class="btn danger" @click.prevent="showConfirmationModal">Delete</button>
    </div>
    <p class="content">{{ detailTodo?.content }}</p>
  </div>
  <div class="footer" v-if="detailTodo?.whenUpdate !== undefined">
    <p>Last Updated: {{ convertDate(detailTodo?.whenUpdate, 'DD MMMM YYYY, HH:mm') }}</p>
  </div>
</template>

<style scoped>
.floating {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.container {
  margin-bottom: 5rem;
}

.header-container {
  padding-block: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.btn-back {
  outline: none;
  border: none;
  /* padding-inline: 1rem; */
  /* padding-block: 0.5rem; */
  font-size: 2rem;
  text-transform: uppercase;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0;
  margin-left: -12px;
}

.icon-back {
  padding: 0;
  transform: translateX(0);
  transition: all 0.1s ease-in;
}

.btn-back:hover > .icon-back {
  /* background-color: #fca5a5; */
  transform: translateX(-3px);
}

.heading {
  display: flex;
  height: 100%;
  gap: 10px;
  margin-bottom: 2rem;
  /* background-color: rebeccapurple; */
}

.content {
  white-space: pre-wrap;
  font-weight: 500;
  font-size: 1rem;
  color: black;
}
.circle-color {
  display: block;
  width: 10px;
  border-radius: 8px;
}

.btn-container {
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
}

.btn {
  outline: none;
  border: none;
  padding-inline: 16px;
  padding-block: 8px;
  border-radius: 10px;
  font-weight: 500;
}

.btn:hover {
  cursor: pointer;
}

.danger {
  border: 1px solid transparent;
  background-color: #fca5a5;
  color: #dc2626;
  letter-spacing: 0.2px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-inline: 15rem;
  padding-block: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  background-color: white;
  color: black;
}
</style>
