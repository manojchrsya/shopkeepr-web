<template>
  <v-list-item class="px-2">
    <v-list-item-action class="mr-2 ml-0 mb-0 mt-3">
      <v-btn color="teal" fab small style="position: relative;right: 20%;" :href="getMobileNo(order.customer)">
        <v-icon color="white" class="mx-0">mdi-cellphone-basic</v-icon>
      </v-btn>
      <v-list-item-action-text class="mt-2">
        <v-btn color="info" x-small>{{ order.itemCount || 0 }} Items</v-btn>
      </v-list-item-action-text>
    </v-list-item-action>
    <v-list-item-content @click.prevent="orderDetailUrl">
      <v-list-item-title v-text="order.customer && $globals._.capitalize(order.customer.name)" />
      <v-list-item-subtitle class="font-weight-medium">Order ID: #{{ order.orderNumber }}</v-list-item-subtitle>
      <v-list-item-subtitle>{{ order.description || 'No Special request.' }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="mx-0 mb-0 mt-1">
      <v-list-item-title class="font-weight-bold my-2 text-right">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" class="px-1" small v-bind="attrs" v-on="on">
              {{ orderStatus }}
              <v-icon right class="ml-0">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list v-if="isShopKeeper" class="py-1">
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
        <v-flex class="pt-2 pl-3">
          <v-list-item-title class="mt-1 font-weight-bold">
            {{ $globals.formatNumber(order.amount) }}
            <v-icon small class="mb-1">
              mdi-currency-inr
            </v-icon>
          </v-list-item-title>
        </v-flex>
      </v-layout>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    statusList: ['RECEIVED', 'ACCEPTED', 'WORK_IN_PROGRESS', 'COMPLETED', 'DELIVERED', 'CLOSED', 'CANCELLED']
  }),
  computed: {
    orderStatus () {
      return this.order.status === 'WORK_IN_PROGRESS' ? 'WIP' : this.order.status
    },
    isShopKeeper () {
      const role = this.$auth && this.$auth.user && _.first(_.map(this.$auth.user.roles, 'name'))
      return role === '$sk-admin'
    }
  },
  methods: {
    getMobileNo (detail) {
      return `tel:${detail.mobile}`
    },
    orderDetailUrl () {
      const query = Object.assign({}, this.$route.query)
      query.orderId = this.order.id
      this.$router.push({ path: '/orders/detail', query })
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
