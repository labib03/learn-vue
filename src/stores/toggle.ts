import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', () => {
  const showFormNewTodos = ref(false)
  const showFormUpdateTodos = ref(false)
  const isFullScreen = ref(false)
  const toast = ref({
    show: false,
    text: '',
    color: ''
  })
  const modal = ref({
    confirmation: false
  })
  // const doubleCount = computed(() => count.value * 2)
  function toggleFormNewTodos() {
    showFormNewTodos.value = !showFormNewTodos.value
  }
  function toggleFormUpdateTodos() {
    showFormUpdateTodos.value = !showFormUpdateTodos.value
  }
  function toggleFullScreen() {
    isFullScreen.value = !isFullScreen.value
  }
  function toggleConfirmationModal() {
    modal.value.confirmation = !modal.value.confirmation
  }
  return {
    toast,
    showFormNewTodos,
    showFormUpdateTodos,
    isFullScreen,
    modal,
    toggleConfirmationModal,
    toggleFullScreen,
    toggleFormNewTodos,
    toggleFormUpdateTodos
  }
})
