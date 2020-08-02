
const numberFormatter = require('number-formatter')
const lodash = require('lodash')

const customerInitial = data => data.split(' ').map(word => word.slice(0, 1).toUpperCase()).join('')
const formatNumber = data => numberFormatter('#,##0.##', Math.round(data))

const showErrorMessage = (message) => {
  window.getApp.$emit('SHOW_ERROR_MESSAGE', { message })
}

const showSuccessMessage = (message) => {
  window.getApp.$emit('SHOW_SUCCESS_MESSAGE', { message })
}

export default function (ctx, inject) {
  const commonMethods = {
    customerInitial,
    formatNumber,
    _: lodash,
    showErrorMessage,
    showSuccessMessage
  }
  ctx.$globals = commonMethods
  inject('globals', commonMethods)
}
