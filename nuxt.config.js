import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  loading: { color: '#1f88e5' },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Shopkeepr App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#317EFB' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/icon.png' },
      { rel: 'icon', type: 'image/png', href: '/icon.png' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vuelidate',
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/globals',
    '@/plugins/firebase'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
    '~/modules/routes',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/SkUsers/Login', method: 'post', propertyName: 'token.id' },
          logout: { url: '/SkUsers/Logout', method: 'post' },
          user: { url: '/SkUsers/findOne?filter[include]=roles', method: 'get', propertyName: false }
        },
        tokenRequired: true,
        tokenType: null
      }
    },
    plugins: [
      '~/plugins/config'
    ],
    redirect: {
      home: '/dashboard',
      logout: '/login'
    }
  },
  router: {
    middleware: ['auth']
  },
  toast: {
    iconPack: 'material',
    theme: 'primary',
    duration: 5000
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
