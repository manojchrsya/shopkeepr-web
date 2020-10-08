import * as firebase from 'firebase/app'
import 'firebase/messaging'
// import * as _ from 'lodash'
// import util from '@/util'
const fcmConfig = require('@/fcm.config.js')

export default function (ctx, inject) {
  class Firebase {
    constructor () {
      // eslint-disable-next-line
      console.log(fcmConfig);
      firebase.initializeApp(fcmConfig)
      this.messaging = firebase.messaging()
      // this.messaging.usePublicVapidKey(process.env.firebaseVapidKey)
      // this.messaging.onTokenRefresh(this.onTokenRefresh)
      // this.messaging.onMessage(this.onMessage)
    }

    // onTokenRefresh () {
    //   this.messaging.getToken().then((refreshedToken) => {
    //     this.messaging.token = refreshedToken
    //     this.sendTokenToServer(refreshedToken)
    //   }).catch((err) => {
    //     // eslint-disable-next-line
    //     console.log('Unable to receive refreshedToken:', err);
    //   })
    // }

    // // eslint-disable-next-line class-methods-use-this
    // onMessage (payload) {
    //   const notification = new Notification(payload.data.title, { body: payload.data.body, icon: '/dearo.png', tag: 'dearo-notify' })
    //   notification.onclick = (event) => {
    //     event.preventDefault()
    //     window.open(payload.data.screen, '_blank')
    //   }
    // }

    // // eslint-disable-next-line class-methods-use-this
    // async sendTokenToServer (token) {
    //   let deviceId = ctx.app.$auth.$storage.getLocalStorage('deviceId')
    //   const url = `FcmNotifications/upsertWithWhere?where=${encodeURIComponent(JSON.stringify({ deviceId }))}`
    //   if (!deviceId) {
    //     deviceId = util.getUniqueId()
    //   }
    //   const data = {
    //     workshopId: _.get(ctx.app.$auth.$storage.getState('user'), 'defaultWorkshop'),
    //     userId: _.get(ctx.app.$auth.$storage.getState('user'), 'id'),
    //     userAccessToken: ctx.app.$auth.getToken('local'),
    //     deviceId,
    //     deviceName: navigator.product,
    //     platform: 'DESKTOP',
    //     version: navigator.appVersion,
    //     fcmAccessToken: token
    //   }
    //   const [error, response] = await ctx.app.$api.post(url, data)
    //   if (!error) {
    //     ctx.app.$auth.$storage.setLocalStorage('deviceId', deviceId)
    //     ctx.app.$auth.$storage.setLocalStorage('fcmId', response.data.id)
    //   }
    // }

    // // eslint-disable-next-line class-methods-use-this
    // async deleteTokenFromServer () {
    //   const fcmId = ctx.app.$auth.$storage.getLocalStorage('fcmId')
    //   const url = `FcmNotifications/${fcmId}`
    //   if (fcmId) {
    //     await ctx.app.$axios.delete(url)
    //     ctx.app.$auth.$storage.setLocalStorage('fcmId', '')
    //   }
    // }

    // requestNotificationPerm () {
    //   this.messaging.requestPermission().then(() => this.messaging.getToken()).then((token) => {
    //     this.messaging.token = token
    //     this.sendTokenToServer(token)
    //   }).catch((err) => {
    //     // eslint-disable-next-line
    //     console.log('Error occured:', err);
    //   })
    // }

    // removeToken () {
    //   const fcmId = ctx.app.$auth.$storage.getLocalStorage('fcmId')
    //   if (fcmId) {
    //     // eslint-disable-next-line no-console
    //     this.messaging.deleteToken(this.messaging.token).catch(console.log)
    //     this.deleteTokenFromServer()
    //   }
    // }
  }

  const firebaseClient = new Firebase()
  ctx.$firebase = firebaseClient
  inject('firebase', firebaseClient)
}
