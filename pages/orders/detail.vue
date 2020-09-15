<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/orders/list'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>Order Details</v-toolbar-title>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="order.customer && $globals._.capitalize(order.customer.name)" />
              <v-list-item-subtitle class="font-weight-medium">Order ID: #{{ order.orderNumber }}</v-list-item-subtitle>
              <v-list-item-subtitle style="white-space: break-spaces;">{{ order.description || 'No Special request.' }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="mx-0 mb-0 mt-1">
              <v-list-item-title class="font-weight-bold mt-2 text-right">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="success" class="px-1 pl-1" small v-bind="attrs" v-on="on">
                      {{ orderStatus }}
                      <v-icon right class="ml-0">mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list class="py-1">
                    <template v-for="(status, statusIndex) in statusList">
                      <v-list-item :key="status" class="py-1" style="min-height:20px;" @click.prevent="updateStatus(status)">
                        <v-list-item-title>{{ status.split('_').join(' ') }}</v-list-item-title>
                      </v-list-item>
                      <v-divider :key="statusIndex" />
                    </template>
                  </v-list>
                </v-menu>
              </v-list-item-title>
              <v-layout>
                <v-flex class="mb-2 pr-3">
                  <v-list-item-avatar class="my-1 mx-0" color="grey darken-3">
                    <v-btn color="teal" fab small :href="getMobileNo(order.customer)">
                      <v-icon color="white" class="mx-0">mdi-cellphone-basic</v-icon>
                    </v-btn>
                  </v-list-item-avatar>
                </v-flex>
              </v-layout>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-if="order.lineItems && order.lineItems.length > 0" class="mt-2">
        <v-list class="px-2 pb-0">
          <v-subheader class="mb-2 px-2" style="height:15px">Items Summary</v-subheader>
          <v-divider />
          <template v-for="(item, index) in order.lineItems">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <OrderDetail :key="item.id" :order="item" :index="index" />
            <v-divider :key="index" />
          </template>
        </v-list>
        <v-layout>
          <v-flex xs6>
            <v-card-subtitle>Sub Total</v-card-subtitle>
          </v-flex>
          <v-spacer />
          <v-flex xs6>
            <v-card-subtitle class="font-weight-bold text-right">
              {{ $globals.formatNumber(order.amount) }} <v-icon small class="mb-1">
                mdi-currency-inr
              </v-icon>
            </v-card-subtitle>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="text-align:center;">
              No item found in bucket.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import OrderDetail from '@/components/order/detail'
const _ = require('lodash')

export default {
  components: {
    OrderDetail
  },
  async asyncData ({ app, route }) {
    const data = {}
    data.shopKeeperId = route.query.shopKeeperId
    if (!data.shopKeeperId && localStorage.getItem('shopKeeperId') !== 'null') {
      data.shopKeeperId = localStorage.getItem('shopKeeperId')
    }
    if (app.$auth && app.$auth.$state && app.$auth.$state.shop) {
      data.shopKeeperId = _.first(app.$auth.$state.shop).id
    }
    const customer = app.$globals.currentCustomer()
    if (customer && customer.id) { data.customerId = customer.id }
    if (data.shopKeeperId && route.query && route.query.orderId) {
      data.orderId = route.query.orderId
      const [error, response] = await app.$api.get('ShopKeepers/getOrderDetails', {
        params: { options: { orderId: data.orderId } }
      })
      if (!error) { data.order = response.data }
    }
    return { ...data }
  },
  data: () => ({
    order: {},
    search: '',
    showCustomer: false,
    statusList: ['RECEIVED', 'ACCEPTED', 'CANCELLED', 'WORK_IN_PROGRESS', 'COMPLETED', 'DELIVERED', 'CLOSED']
  }),
  computed: {
    business () {
      return _.first(this.$auth.state.shop) || {}
    },
    totalAmount () {
      return this.$globals.formatNumber(_.sumBy(this.order.lineItems, 'amount')) || 0
    },
    orderStatus () {
      return this.order.status === 'WORK_IN_PROGRESS' ? 'WIP' : this.order.status
    }
  },
  methods: {
    openCustomerDialog () {
      this.showCustomer = true
    },
    getMobileNo (detail) {
      return `tel:${detail.mobile}`
    },
    async updateStatus (status) {
      const formData = {
        orderId: this.order.id,
        status
      }
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await this.$api.post(`ShopKeepers/${this.order.shopKeeperId}/updateOrderStatus`, formData)
      if (!error && response) {
        window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
          message: 'Order Status updated successfully!!!'
        })
        this.order.status = status
      }
    }
  }
}
</script>
<style scoped>
.centered-input >>> input {
  text-align: center
}
</style>
