import * as firebase from 'firebase/app'
import 'firebase/messaging'
const fcmConfig = require('@/fcm.config.js')

export default function (ctx, inject) {
  class Firebase {
    constructor () {
      firebase.initializeApp(fcmConfig)
      this.messaging = firebase.messaging()
      this.messaging.onMessage(this.onMessage)
    }

    onMessage (payload) {
      navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then((registration) => {
        registration.showNotification(payload.notification.title, { body: payload.notification.body, icon: '/icon.ico' })
      })
    }

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

    async removeToken () {
      const deviceId = ctx.app.$auth.$storage.getLocalStorage('deviceId')
      const url = `ShopKeepers/removeFcmToken/${deviceId}`
      if (deviceId) {
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await ctx.app.$axios.delete(url)
        if (!error) {
          ctx.app.$auth.$storage.setLocalStorage('deviceId', '')
        }
      }
    }

    saveToken () {
      Notification.requestPermission().then(() => this.messaging.getToken()).then((token) => {
        this.messaging.token = token
        this.sendTokenToServer(token)
      }).catch((err) => {
        // eslint-disable-next-line
        console.warn('Error occured:', err);
      })
    }
  }

  const firebaseClient = new Firebase()
  ctx.$firebase = firebaseClient
  inject('firebase', firebaseClient)
}
