
const numberFormatter = require('number-formatter')
const lodash = require('lodash')

const customerInitial = data => data.split(' ').splice(0, 2).map(word => word.slice(0, 1).toUpperCase()).join('')
const formatNumber = data => numberFormatter('#,##0.##', Math.round(data))

const showErrorMessage = (message) => {
  window.getApp.$emit('SHOW_ERROR_MESSAGE', { message })
}

const showSuccessMessage = (message) => {
  window.getApp.$emit('SHOW_SUCCESS_MESSAGE', { message })
}

const units = () => {
  return ['LTR', 'PCS', 'PKT', 'UNT', 'KG', '500 G', '250 G', '50 G']
}

export default function (ctx, inject) {
  const commonMethods = {
    customerInitial,
    formatNumber,
    _: lodash,
    showErrorMessage,
    showSuccessMessage,
    units
  }
  ctx.$globals = commonMethods
  inject('globals', commonMethods)
}
