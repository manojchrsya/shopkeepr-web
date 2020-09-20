<template>
  <v-layout row wrap align-center>
    <v-flex>
      <Customer title="My Shop Bucket" />
      <v-card class="mx-auto px-0">
        <Shop :business="business" />
      </v-card>
      <v-card v-if="products.length > 0" class="mt-2">
        <v-list class="px-0 pb-0">
          <v-subheader class="mb-2 px-2" style="height:15px">Order Summary</v-subheader>
          <v-divider />
          <template v-for="(item, index) in products">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <Product
              :key="item.id"
              :index="index"
              :product="item"
              :source="'bucket'"
              @show-customer="openCustomerDialog"
              @delete-bucket-product="deleteProduct"
            />
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
              {{ totalAmount }} <v-icon small class="mb-1">
                mdi-currency-inr
              </v-icon>
            </v-card-subtitle>
          </v-flex>
        </v-layout>
        <v-divider />
        <v-card-text class="py-0 pt-1">
          <v-flex class="py-0" xs12>
            <v-textarea
              v-model="description"
              placeholder="Any other special request, will pass it to shopkeeper..."
              append-icon="mdi-information"
              single-line
              dense
              solo
              :rows="3"
            />
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark @click.prevent="placeOrder">
              Place order
            </v-btn>
          </v-flex>
        </v-card-actions>
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
import Product from '@/components/product'
import Shop from '@/components/shop'
import Customer from '@/components/customer'
const _ = require('lodash')

export default {
  components: {
    Product,
    Shop,
    Customer
  },
  async asyncData ({ app, route }) {
    const data = {}
    if (app.$auth && app.$auth.$state && app.$auth.$state.shop) {
      data.shopKeeperId = app.$auth.$state.shop.id
      const { customer } = app.$auth.$state.shop
      if (customer && customer.id) { data.customerId = customer.id }
    }
    if (data.customerId && data.shopKeeperId) {
      const [error, response] = await app.$api.get(`Customers/${data.customerId}/getBucket`)
      if (!error) { data.products = response.data }
    }
    return { ...data }
  },
  data: () => ({
    products: [],
    search: '',
    showCustomer: false,
    shopKeeperId: '',
    customerId: '',
    description: ''
  }),
  computed: {
    business () {
      return this.$auth.state.shop || {}
    },
    totalAmount () {
      return this.$globals.formatNumber(_.sumBy(this.products, 'amount')) || 0
    }
  },
  methods: {
    openCustomerDialog () {
      this.showCustomer = true
    },
    deleteProduct (data) {
      this.products.splice(data.index, 1)
      return true
    },
    async placeOrder () {
      const formData = {
        customerId: this.customerId,
        description: this.description
      }
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await this.$api.post(`ShopKeepers/${this.shopKeeperId}/placeOrder`, formData)
      if (!error && response) {
        window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
          message: 'Order placed successfully!!!'
        })
        // reset the cart items
        this.products = []
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
