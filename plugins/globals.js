
const numberFormatter = require('number-formatter')

const customerInitial = data => data.split(' ').map(word => word.slice(0, 1).toUpperCase()).join('')
const formatNumber = data => numberFormatter('#,##0.##', Math.round(data))

export default function (ctx, inject) {
  const commonMethods = {
    customerInitial,
    formatNumber
  }
  ctx.$globals = commonMethods
  inject('globals', commonMethods)
}
