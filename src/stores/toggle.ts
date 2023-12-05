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
    if (showFormNewTodos.value) {
      document.body.style.overflowY = 'auto'
      showFormNewTodos.value = false
    } else {
      document.body.style.overflowY = 'hidden'
      showFormNewTodos.value = true
    }
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
    if (modal.value.confirmation) {
      document.body.style.overflowY = 'auto'
      modal.value.confirmation = false
    } else {
      document.body.style.overflowY = 'hidden'
      modal.value.confirmation = true
    }
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
