
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js')

firebase.initializeApp({
  messagingSenderId: '509429555558'
})
// eslint-disable-next-line no-unused-vars
// const messaging = firebase.messaging()

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
// messaging.setBackgroundMessageHandler(function (payload) {
//   // eslint-disable-next-line no-console
//   console.log('[firebase-messaging-sw.js] Received background message ', payload)
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   }

//   return self.registration.showNotification(notificationTitle, notificationOptions)
// })
