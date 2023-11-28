<script setup lang="ts">
import { useToggleStore } from '@/stores/toggle'
import { useTodosStore, type TodosType } from '@/stores/todos'
import { COLORS } from '@/utils/colors'
import { effect, onMounted, reactive, ref, watch } from 'vue'
import { uuid } from 'vue-uuid'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const toggle = useToggleStore()
const { addTodos, findTodoById } = useTodosStore()

const showToast = ref({
  show: false,
  text: '',
  color: ''
})

const selectedTodo = reactive({ ...findTodoById(params.todo) })

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
  title: selectedTodo?.title || '',
  content: selectedTodo?.content || '',
  color: selectedTodo?.color || ''
})

function closeForm() {
  form.value = {
    title: '',
    content: '',
    color: ''
  }
  hideToast()
  toggle.toggleFormNewTodos()
}

function saveTodos() {
  if (form.value.title && form.value.content) {
    showToast.value = {
      show: true,
      color: '#16a34a',
      text: 'Success Create Note'
    }
    const payload: TodosType = {
      ...form.value,
      when: new Date(),
      id: uuid.v4(),
      isComplete: false
    }
    addTodos(payload)

    return
  }

  showToast.value = {
    show: true,
    color: '#dc2626',
    text: "Failed Create Note, Please don't leave field blank"
  }
}

function setColor(payload: string) {
  form.value.color = payload
}
</script>

<template>
  <Transition>
    <div class="overlay" v-if="toggle.showFormNewTodos">
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
          <button @click.prevent="saveTodos" class="btn hover">Save</button>
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
            <p>Total char: {{ form.content.length }}</p>
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
