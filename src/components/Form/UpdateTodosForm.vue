<script setup lang="ts">
import type { TodosType } from '@/stores/todos'
import { useTodosStore } from '@/stores/todos'
import { useToggleStore } from '@/stores/toggle'
import { COLORS } from '@/utils/colors'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const toggle = useToggleStore()
const todos = useTodosStore()

const showToast = ref(toggle.toast)
const selectedTodo = todos.findTodoById(params.todo)

function hideToast() {
  showToast.value.show = false
}

watch(showToast, (state, oldState, onCleanUp) => {
  if (state) {
    const t = setTimeout(() => {
      hideToast()
    }, 2000)

    onCleanUp(() => {
      return clearTimeout(t)
    })
  }
})

const form = ref({
  title: selectedTodo?.title,
  content: selectedTodo?.content,
  color: selectedTodo?.color
})

function saveTodo() {
  showToast.value = {
    show: true,
    color: '#16a34a',
    text: 'Success Update Note'
  }

  const payload: TodosType = {
    id: selectedTodo?.id as string,
    title: form.value.title as string,
    content: form.value.content as string,
    color: form.value.color as string,
    when: selectedTodo?.when as Date,
    whenUpdate: new Date(),
    isComplete: selectedTodo?.isComplete as boolean
  }
  todos.updateTodo(payload)
}

function closeForm() {
  // form.value = {
  //   title: '',
  //   content: '',
  //   color: ''
  // }
  hideToast()
  toggle.toggleFormUpdateTodos()
}

function setColor(payload: string) {
  form.value.color = payload
}
</script>

<template>
  <Transition>
    <div class="overlay" v-if="toggle.showFormUpdateTodos">
      <Transition>
        <div
          class="todo"
          v-if="showToast.show"
          @mouseenter="hideToast"
          :style="{ backgroundColor: showToast.color }"
        >
          <p>{{ showToast.text }}</p>
        </div>
      </Transition>
      <div class="content">
        <div class="header-container">
          <button @click.prevent="closeForm" class="btn hover">Back</button>
          <button @click.prevent="saveTodo" class="btn hover">Update</button>
        </div>
        <input v-model="form.title" class="form form-title" placeholder="Title" />
        <textarea v-model="form.content" class="form form-content" placeholder="Content" />
        <div class="footer-container">
          <div class="btn-footer-container">
            <div
              v-for="color in COLORS"
              :key="color.name"
              :class="['btn-color hover', { selected: color.color === form.color }]"
              @click="setColor(color.color)"
            >
              <span :style="{ backgroundColor: color.color }" class="color-preview" />
              <p class="">{{ color.name }}</p>
            </div>
          </div>

          <div>
            <p>Total char: {{ form?.content?.length || 0 }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 99;
  background-color: white;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--form-bg);
  height: 100%;
  padding-inline: 30px;
}

.todo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #86efac;
  padding-block: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo p {
  font-size: 15px;
  font-weight: bolder;
  color: black;
}

.form {
  outline: none;
  border: none;
  padding-block: 10px;
  font-size: 3rem;
  background-color: var(--form-bg);
}

.form::placeholder {
  color: rgba(0, 0, 0, 0.2);
}

.form-content {
  height: 100%;
  padding-bottom: 0;
}

.header-container {
  display: flex;
  gap: 8px;
  padding-block: 20px;
}

.footer-container {
  padding-block: 15px;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-footer-container {
  display: flex;
  gap: 8px;
}

.btn {
  text-transform: uppercase;
  outline: none;
  border: none;
  font-size: 2rem;
  background-color: transparent;
  /* color: rgba(0, 0, 0, 0.2); */
}

.hover:hover {
  cursor: pointer;
}

.btn-color {
  display: flex;
  align-items: center;
  gap: 3px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding-inline: 5px;
  padding-right: 9px;
}

.color-preview {
  height: 15px;
  width: 15px;
  border-radius: 100%;
}

.selected {
  border: 1px solid black;
}
</style>
