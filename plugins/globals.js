
const customerInitial = data => data.split(' ').map(word => word.slice(0, 1).toUpperCase()).join('')

export default function (ctx, inject) {
  const commonMethods = {
    customerInitial
  }
  ctx.$globals = commonMethods
  inject('globals', commonMethods)
}
