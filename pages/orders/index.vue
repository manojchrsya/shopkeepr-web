<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card flat class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-flex class="mt-7" xs12>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              solo="solo"
              label="Search orders..."
              single-line="single-line"
            />
          </v-flex>
        </v-toolbar>
        <Shop :business="business" />
        <v-divider />
        <v-list-item class="px-2">
          <v-list-item-content class="py-1">
            <v-list-item-subtitle>Filters</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="py-1 my-0">
            <v-btn-toggle v-model="orderType" @change="filterOrders">
              <v-btn color="primary" small value="open">OPEN</v-btn>
              <v-btn color="primary" small value="closed">CLOSED</v-btn>
            </v-btn-toggle>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list v-if="orders.length > 0" three-line class="px-0 pt-0">
          <template v-for="(item, index) in orders">
            <Order :key="item.id" :order="item" :index="index" />
            <v-divider :key="index" />
          </template>
        </v-list>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title style="text-align:center;">No Orders found.</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Shop from '@/components/shop'
import Order from '@/components/order'
const _ = require('lodash')

export default {
  components: {
    Shop,
    Order
  },
  async asyncData ({ app, route }) {
    const data = {}
    data.customerId = route.query.customerId || localStorage.getItem('customerId')
    localStorage.setItem('customerId', data.customerId)
    let shopKeeperId = route.query.shopKeeperId || localStorage.getItem('shopKeeperId')
    if (app.$auth && app.$auth.$state && app.$auth.$state.shop) {
      shopKeeperId = _.first(app.$auth.$state.shop).id
    }
    data.shopKeeperId = shopKeeperId
    localStorage.setItem('shopKeeperId', data.shopKeeperId)
    const [error, response] = await app.$api.get('ShopKeepers/getOrders', {
      params: { options: { customerId: data.customerId, orderType: 'open' } }
    })
    if (!error) { data.orders = response.data }
    return { ...data }
  },
  data: () => ({
    orders: [],
    search: '',
    customerId: '',
    shopKeeperId: '',
    orderType: 'open'
  }),
  computed: {
    business () {
      return _.first(this.$auth.state.shop) || {}
    }
  },
  methods: {
    openCustomerDialog () {
      this.showCustomer = true
    },
    async filterOrders () {
      const formData = {
        shopKeeperId: this.shopKeeperId,
        customerId: this.customerId,
        orderType: this.orderType
      }
      const [error, response] = await this.$api.get('ShopKeepers/getOrders', {
        params: { options: { ...formData } }
      })
      if (!error && response) {
        // update the filtered order in view
        this.orders = response.data
      }
    }
  }
}
</script>
