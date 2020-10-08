
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
  return ['LTR', 'PCS', 'PKT', 'UNT', 'KG', 'DZN', '500 G', '250 G', '50 G']
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * ((max - min) + 1)) + min
}

const getUniqueId = () => `${Date.now()}${getRandomInt(111, 999)}`

export default function (ctx, inject) {
  const commonMethods = {
    customerInitial,
    formatNumber,
    _: lodash,
    showErrorMessage,
    showSuccessMessage,
    units,
    getUniqueId
  }
  ctx.$globals = commonMethods
  inject('globals', commonMethods)
}
