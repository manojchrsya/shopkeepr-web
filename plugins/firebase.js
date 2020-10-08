import * as firebase from 'firebase/app'
import 'firebase/messaging'
const fcmConfig = require('@/fcm.config.js')

export default function (ctx, inject) {
  class Firebase {
    constructor () {
      firebase.initializeApp(fcmConfig)
      this.messaging = firebase.messaging()
      // this.messaging.usePublicVapidKey(process.env.firebaseVapidKey)
      // this.messaging.onTokenRefresh(this.onTokenRefresh)
      // this.messaging.onMessage(this.onMessage)
      // this.saveToken()
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

    // eslint-disable-next-line class-methods-use-this
    async sendTokenToServer (token) {
      let deviceId = ctx.app.$auth.$storage.getLocalStorage('deviceId')
      const url = 'Shopkeepers/saveFcmToken'
      if (!deviceId) {
        deviceId = ctx.$globals.getUniqueId()
      }
      const data = {
        deviceId,
        deviceName: navigator.product,
        fcmAccessToken: token
      }
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await ctx.app.$api.post(url, data)
      if (!error) {
        ctx.app.$auth.$storage.setLocalStorage('deviceId', deviceId)
      }
    }

    // // eslint-disable-next-line class-methods-use-this
    // async deleteTokenFromServer () {
    //   const fcmId = ctx.app.$auth.$storage.getLocalStorage('fcmId')
    //   const url = `FcmNotifications/${fcmId}`
    //   if (fcmId) {
    //     await ctx.app.$axios.delete(url)
    //     ctx.app.$auth.$storage.setLocalStorage('fcmId', '')
    //   }
    // }

    saveToken () {
      Notification.requestPermission().then(() => this.messaging.getToken()).then((token) => {
        this.messaging.token = token
        this.sendTokenToServer(token)
      }).catch((err) => {
        // eslint-disable-next-line
        console.warn('Error occured:', err);
      })
    }

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
