import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  function toggleFormNewTodos() {
    showFormNewTodos.value = !showFormNewTodos.value
  }
  function toggleFormUpdateTodos() {
    if (showFormUpdateTodos.value) {
      document.body.style.overflowY = 'auto'
      showFormUpdateTodos.value = false
    } else {
      document.body.style.overflowY = 'hidden'
      showFormUpdateTodos.value = true
    }
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
