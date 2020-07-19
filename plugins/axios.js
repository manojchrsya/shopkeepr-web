import * as _ from 'lodash'

export default function ({ $axios }) {
  // runs everytime on api call
  $axios.onError((error) => {
    // do not show message in case of validation
    let errorMessage = _.has(error.response.data, 'error.message') ? error.response.data.error.message : ''
    if (window.getApp && error.response && error.response.data &&
        error.response.data.error && error.response.data.error.statusCode !== 422) {
      if (_.has(error.response.data.error, 'details.messages') &&
        !_.isEmpty(error.response.data.error.details.messages)) {
        errorMessage = ''
        _.each(error.response.data.error.details.messages, (messages, key) => {
          _.each(messages, (message) => {
            errorMessage += `${_.startCase(key)} ${message} <br>`
          })
        })
      }
      window.getApp.$emit('SHOW_ERROR_MESSAGE', {
        message: errorMessage
      })
    }
  })
}
