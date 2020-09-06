<template>
  <v-list-item class="px-2">
    <!-- <v-list-item-icon class="mx-2">
      <v-img :border-radius="10" :src="item.avatar" :max-height="60" :max-width="50" />
    </v-list-item-icon> -->
    <v-list-item-content>
      <v-list-item-title v-text="product.title" />
      <v-list-item-subtitle v-if="source === 'product'" v-html="product.description" />
      <v-list-item-subtitle v-else-if="source === 'bucket'">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="px-1 info" small v-bind="attrs" v-on="on">
              <v-icon small> mdi-currency-inr</v-icon> {{ getPricePerUnit }}
            </v-btn>
          </template>
        </v-menu>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="mx-0 mb-0 mt-1">
      <v-list-item-title v-if="source === 'product'" class="font-weight-bold my-1  text-right">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="px-1" small v-bind="attrs" v-on="on">
              <v-icon small> mdi-currency-inr</v-icon> {{ getPricePerUnit }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="rate in product.price" :key="rate.unit" class="py-1" style="min-height:20px;">
              <v-list-item-title @click="updatePrice(rate)">
                <v-icon small> mdi-currency-inr</v-icon> {{ $globals.formatNumber(rate.value) }} / {{ rate.unit }}
              </v-list-item-title>
              <v-divider />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-title>
      <v-layout v-if="quantity > 0" class="mt-1">
        <v-flex class="py-0">
          <v-btn color="success" fab x-small class="mr-2" @click="updateQuantity({type: 'minus'})">
            <v-icon class="mx-0">
              mdi-minus
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="py-0">
          <v-text-field
            v-model="quantity"
            dense
            readonly
            single-line
            class="centered-input"
            style="width: 20px;"
          />
        </v-flex>
        <v-flex class="py-0">
          <v-btn color="success" fab x-small class="ml-2" @click="updateQuantity({type: 'plus'})">
            <v-icon class="mx-0">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex v-if="source === 'bucket'" class="py-0 pl-3">
          <v-list-item-title class="mt-1">
            {{ $globals.formatNumber(product.amount) }}
            <v-icon small class="mb-1">
              mdi-currency-inr
            </v-icon>
          </v-list-item-title>
        </v-flex>
      </v-layout>
      <v-layout v-else>
        <v-flex class="py-0">
          <v-btn color="success" small class="mt-2" @click="updateQuantity({type: 'plus'})"> ADD </v-btn>
        </v-flex>
      </v-layout>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
const _ = require('lodash')

export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    },
    source: {
      type: String,
      default: 'product'
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    quantity: 0,
    unit: 'UNT',
    price: 0,
    customerId: '',
    shopKeeperId: ''
  }),
  computed: {
    getPricePerUnit () {
      return `${this.$globals.formatNumber(this.price)} / ${this.unit}`
    }
  },
  created () {
    this.customerId = this.$route.query.customerId || localStorage.getItem('customerId')
    this.shopKeeperId = this.$route.query.shopKeeperId || localStorage.getItem('shopKeeperId')
    if (this.$auth && this.$auth.state && this.$auth.state.shop) {
      this.shopKeeperId = _.first(this.$auth.state.shop).id
    }
    this.quantity = this.product.quantity || 0
    this.unit = this.product.unit
    this.price = this.product.price || 0
    if (this.product && this.product.price.length > 0 && this.product.unit) {
      const finalPrice = _.find(this.product.price, { unit: this.product.unit }) || {}
      this.unit = this.product.unit
      this.price = finalPrice.value
    }
  },
  methods: {
    async updateQuantity (options) {
      if (!this.customerId) {
        this.$emit('show-customer')
        return false
      }
      const { type } = options
      type === 'plus' ? this.quantity += 1 : this.quantity -= 1
      await this.addToBucket()
      return true
    },
    async updatePrice (rate) {
      this.unit = rate.unit
      this.price = rate.value
      await this.addToBucket()
    },
    async addToBucket () {
      if (!this.customerId) {
        this.$emit('show-customer')
        return false
      }
      const formData = {
        customerId: this.customerId,
        shopKeeperId: this.shopKeeperId,
        productId: this.source === 'product' ? this.product.id : this.productId,
        title: this.product.title,
        unit: this.unit,
        price: this.price,
        quantity: this.quantity
      }
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await this.$api.post(`Customers/${this.customerId}/updateBucket`, formData)
      if (!error && response) {
        window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
          message: 'Product updated in bucket.'
        })
        this.product.amount = response.data.amount
        if (this.quantity <= 0 && this.source === 'bucket') {
          this.$emit('delete-bucket-product', { index: this.index })
        }
      }
      return true
    }
  }
}
</script>
<style scoped>
.centered-input >>> input {
  text-align: center
}
</style>
