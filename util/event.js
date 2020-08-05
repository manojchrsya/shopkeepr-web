export default [
  {
    name: 'SHOW_ERROR_MESSAGE',
    callback (data) {
      this.snackbar = {
        show: true,
        color: 'error',
        text: data.message
      }
    }
  },
  {
    name: 'SHOW_SUCCESS_MESSAGE',
    callback (data) {
      this.snackbar = {
        show: true,
        color: 'success',
        text: data.message
      }
    }
  }
]
