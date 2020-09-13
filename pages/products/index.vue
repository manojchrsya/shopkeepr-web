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
              label="Search products..."
              single-line="single-line"
            />
          </v-flex>
        </v-toolbar>
        <Shop :business="business" />
        <v-divider />
        <v-list v-if="products.length > 0" three-line class="px-0">
          <template v-for="(item, index) in products">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <Product :key="item.id" :index="index" :product="item" @show-customer="openCustomerDialog" />
            <v-divider :key="index" />
          </template>
        </v-list>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title style="text-align:center;">
              No Product found.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-dialog v-model="showCustomer" persistent max-width="290">
        <v-card>
          <v-card-title>
            <span class="headline">Profile Details</span>
          </v-card-title>
          <v-divider />
          <v-card-text class="py-0">
            <v-layout>
              <v-flex class="pt-3" xs12>
                <v-text-field
                  v-model="customer.name"
                  label="Name"
                  solo
                  append-icon="mdi-account"
                  dense
                  single-line
                  :error-messages="nameErrors"
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="py-0" xs12>
                <v-text-field
                  v-model="customer.mobile"
                  label="Mobile Number"
                  solo
                  append-icon="mdi-cellphone-basic"
                  dense
                  single-line
                  :error-messages="mobileErrors"
                />
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="green darken-1" text @click="showCustomer = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click.prevent="getCustomerId()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required, numeric, minLength, maxLength
} from 'vuelidate/lib/validators'
import Product from '@/components/product'
import Shop from '@/components/shop'
const _ = require('lodash')
// eslint-disable-next-line no-useless-escape
const mobileRegex = /^[6789]\d{9}$/

export default {
  components: {
    Product,
    Shop
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
    const [error, response] = await app.$api.get(`ShopKeepers/${shopKeeperId}/getProducts`, {
      params: { options: { customerId: data.customerId } }
    })
    if (!error) { data.products = response.data }
    return { ...data }
  },
  data: () => ({
    products: [],
    search: '',
    customerId: '',
    shopKeeperId: '',
    showCustomer: false,
    customer: {
      name: '',
      mobile: ''
    }
  }),
  computed: {
    business () {
      return _.first(this.$auth.state.shop) || {}
    },
    getMobileNo () {
      return `tel:${this.business.mobile}`
    },
    nameErrors () {
      const errors = []
      if (!this.$v.customer.name.$dirty) { return errors }
      if (!this.$v.customer.name.required) { errors.push('Name is required.') }
      return errors
    },
    mobileErrors () {
      const errors = []
      if (!this.$v.customer.mobile.$dirty) { return errors }
      if (!this.$v.customer.mobile.required) { errors.push('Name is required.') }
      if (!this.$v.customer.mobile.isValidMobileNumber) { errors.push('Invalid Mobile.') }
      return errors
    }
  },
  methods: {
    openCustomerDialog () {
      this.showCustomer = true
    },
    bucketUrl () {
      if (!this.customerId) {
        this.showCustomer = true
        return false
      }
      const query = Object.assign({}, this.$route.query)
      query.customerId = this.customerId
      query.shopKeeperId = this.shopKeeperId
      this.$router.push({ path: '/bucket', query })
    },
    getPricePerUnit (item) {
      if (item && item.price.length > 0 && item.unit) {
        const finalPrice = _.find(item.price, { unit: item.unit }) || {}
        return `${this.$globals.formatNumber(finalPrice.value)} / ${item.unit}` || 0
      }
      return 0
    },
    async getCustomerId () {
      this.$v.customer.$touch()
      if (!this.$v.customer.$invalid) {
        const formData = {
          shopKeeperId: this.shopKeeperId,
          name: this.customer.name,
          mobile: this.customer.mobile
        }
        const [error, response] = await this.$api.post('Customers/findDetails', formData)
        if (!error && response) {
          this.$globals.showSuccessMessage('Profile save successfully.')
          this.customerId = response.data.id
          // save data in local storage
          localStorage.setItem('customerId', this.customerId)
          this.showCustomer = false
        } else {
          const errorMessage = _.has(error.response.data, 'error.message') ? error.response.data.error.message : ''
          this.$globals.showErrorMessage(errorMessage)
        }
      }
    }
  },
  validations: {
    customer: {
      name: {
        required
      },
      mobile: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
        isValidMobileNumber (value) {
          return value ? mobileRegex.test(value) : true
        }
      }
    }
  }
}
</script>
