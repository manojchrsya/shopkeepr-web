import _ from 'lodash'
import routes from '../util/routes'

export default async function ({ app }) {
  if (!app.$auth.loggedIn) {
    app.router.addRoutes([{ path: '/', redirect: '/login' }])
    return
  }
  // set config in auth storage
  if (app.$auth.user && !_.isEmpty(app.$auth.user.roles)) {
    const role = _.first(_.map(app.$auth.user.roles, 'name'))
    let allowedRoutes = _.uniq(_.compact(_.first(_.map(app.$auth.user.roles, 'routes')))) || []
    allowedRoutes = _.filter(routes, data => allowedRoutes.includes(data.path))
    // redirect to default route
    const defaultRoute = _.get(_.first(app.$auth.user.roles), 'defaultRoute') || '/dashboard'
    allowedRoutes.push({ path: '/', redirect: defaultRoute })
    app.$auth.$storage.setState('allowedRoutes', allowedRoutes)
    app.router.addRoutes(allowedRoutes)
    // set scope in storage
    app.$auth.$storage.setState('scope', role)
    // set config in auth storage
    const configUrl = '/ShopKeepers/getShopConfig'
    const [configuration, shop] = await Promise.all([
      app.$axios.get(configUrl),
      app.$axios.get('/ShopKeepers/getDetails')
    ])
    if (configuration && shop) {
      app.$auth.$storage.setState('config', configuration.data)
      app.$auth.$storage.setState('shop', shop.data)
    }
  }

  function normalizeKey (key) {
    if (!_.isArray(key)) {
      // eslint-disable-next-line no-param-reassign
      key = _.split(key, '.')
    }
    const newKey = []
    _.forEach(key, (k) => {
      if (_.includes(k, '.')) {
        _.split(k, '.').forEach((ks) => {
          newKey.push(ks)
        })
      } else {
        newKey.push(k)
      }
    })
    return newKey
  }

  const config = {}
  // get configuration specific key
  config.get = key => _.get(app.$auth.$storage.getState('config'), key) || false

  // check whether provided key is disbaled or not
  config.isEnabled = (key) => {
    const configData = app.$auth.$storage.getState('config')
    // eslint-disable-next-line no-param-reassign
    key = normalizeKey(key)
    let enabled = false
    for (let i = 0; i < key.length; i += 1) {
      const k = _.take(key, i + 1)
      // If key does not exist then Not Enabled
      if (!_.hasIn(configData, k)) {
        enabled = false
        break
      }
      const val = _.get(configData, k)
      // If key is not an object and value is set to false then also Not Enabled
      if (!_.isObject(val) && val === false) {
        enabled = false
        break
      }

      if (_.isObject(val)) {
        // If key is an object but enabled key does not exist in it then also Not Enabled
        if (!_.hasIn(val, 'enabled')) {
          enabled = false
          break
        }
        if (_.get(val, 'enabled') !== true) {
          enabled = false
          break
        }
      }
      // Otherwise Enabled
      enabled = true
    }
    return enabled
  }

  // eslint-disabled-next-line no-param-reassign
  app.$auth.$config = config
}
