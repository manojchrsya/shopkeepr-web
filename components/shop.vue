<template>
  <v-flex>
    <v-list two-line subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ business.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ business.tagLine }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="business.order && business.order.minimumAmount">
            Minimun order with {{ $globals.formatNumber(business.order.minimumAmount) }} <v-icon small class="mb-1">
              mdi-currency-inr
            </v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar class="my-0 mx-0" color="grey darken-3">
          <v-avatar color="teal">
            <span class="white--text" v-text="$globals.customerInitial(business.displayName)" />
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
    <v-bottom-navigation color="tranparent">
      <v-btn :to="'/products'">
        <span>Products</span>
        <v-icon>mdi-chart-box</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn :href="getMobileNo">
        <span>Call Now</span>
        <v-icon>mdi-cellphone-basic</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-if="isShopKeeper" :href="textMessage">
        <span>Share</span>
        <v-icon>mdi-share-outline</v-icon>
      </v-btn>
      <v-btn v-else :disabled="!(customer && customer.id)" :to="'/bucket'">
        <span>Basket</span>
        <v-icon>mdi-basket-outline</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn :disabled="!(isShopKeeper || (customer && customer.id))" :to="'/orders/list'">
        <span>Orders</span>
        <v-icon>mdi-clipboard-text-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-flex>
</template>

<script>
const _ = require('lodash')

export default {
  props: {
    business: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getMobileNo () {
      return `tel:${this.business.mobile}`
    },
    customer () {
      return this.$auth.$state.shop && this.$auth.$state.shop.customer
    },
    textMessage () {
      const details = this.$auth.state.shop || {}
      if (details.sms && details.sms.share) {
        return `sms:?&body=${encodeURI(details.sms.share)}`
      }
      return ''
    },
    isShopKeeper () {
      const role = this.$auth && this.$auth.user && _.first(_.map(this.$auth.user.roles, 'name'))
      return role === '$sk-admin'
    }
  }
}
</script>
