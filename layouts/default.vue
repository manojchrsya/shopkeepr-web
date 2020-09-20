<template>
  <v-app>
    <v-main>
      <v-container class="py-0">
        <nuxt />
      </v-container>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        top
        centered
        :color="snackbar.color"
      >
        <p class="text-center mb-0">
          {{ snackbar.text }}
        </p>
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar.show = false"
          >
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-footer v-if="isShopKeeper" class="px-0 py-0">
      <v-bottom-navigation v-model="bottomNav" grow light fixed app>
        <v-btn :to="'/dashboard'">
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
        <v-btn :to="'/customers/list'">
          <span>Customer</span>
          <v-icon>mdi-account-box-multiple</v-icon>
        </v-btn>
        <v-btn :to="'/transactions'">
          <span>Transactions</span>
          <v-icon>mdi-currency-inr</v-icon>
        </v-btn>
        <v-btn :to="'/products'">
          <span>Products</span>
          <v-icon>mdi-chart-box</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'
import AppEvents from '@/util/event'

export default {
  data () {
    return {
      bottomNav: 0,
      snackbar: {
        show: false,
        text: '',
        color: ''
      }
    }
  },
  computed: {
    isShopKeeper () {
      const role = this.$auth && this.$auth.user && _.first(_.map(this.$auth.user.roles, 'name'))
      return role === '$sk-admin'
    }
  },
  created () {
    AppEvents.forEach((item) => {
      this.$on(item.name, item.callback)
    })
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.getApp = this
  }
}
</script>
