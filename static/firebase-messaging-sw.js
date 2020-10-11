
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.22.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyArobgH0eZz2gW7iqvlQ8ZUy6Sgj_90R7U',
  authDomain: 'eshopkeepr.firebaseapp.com',
  databaseURL: 'https://eshopkeepr.firebaseio.com',
  projectId: 'eshopkeepr',
  storageBucket: 'eshopkeepr.appspot.com',
  messagingSenderId: '509429555558',
  appId: '1:509429555558:web:2c61d1e970d107c70268a7',
  measurementId: 'G-Y92NR0KJPF'
})
// eslint-disable-next-line no-unused-vars
const messaging = firebase.messaging()

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  // eslint-disable-next-line no-console
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // Customize notification here
  const options = {
    body: payload.notification.body,
    icon: '/icon.ico'
  }
  return self.registration.showNotification(payload.notification.title, options)
})
