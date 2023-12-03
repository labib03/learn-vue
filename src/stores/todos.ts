import { defineStore } from 'pinia'
import { ref } from 'vue'

export type TodosType = {
  title: string
  content: string
  color: string
  when?: Date
  whenUpdate?: Date
  id: string
  isComplete: boolean
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<TodosType[]>([])

  function toggleCompeleted(id: string) {
    todos.value.forEach((t) => {
      if (t.id === id) {
        t.isComplete = !t.isComplete
      }
    })
  }

  function addTodos(payload: TodosType) {
    todos.value.push(payload)
  }

  function updateTodo(payload: TodosType) {
    const updatedTodos = todos.value.map((item) => {
      if (item.id === payload.id) {
        return { ...item, ...payload }
      }
      return item
    })

    todos.value = updatedTodos
  }

  function deleteTodo(id: string) {
    const newCollection = todos.value.filter((t) => t.id !== id)

    todos.value = newCollection
  }

  function findTodoById(id: string | string[]) {
    const find = todos.value.find((t) => t.id === id)

    return find
  }

  return { todos, addTodos, updateTodo, findTodoById, toggleCompeleted, deleteTodo }
})
