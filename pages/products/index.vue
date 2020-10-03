<template>
  <v-layout row wrap align-center>
    <v-flex>
      <Customer title="Products Collection" />
      <v-card flat class="mx-auto px-0">
        <Shop :business="business" :customer="customer" />
        <v-divider />
        <v-flex v-if="categoryList.length > 0" xs12>
          <v-chip-group v-model="categories" multiple active-class="primary--text">
            <v-chip v-for="category in categoryList" :key="category" :value="category">
              <strong>{{ category }}</strong>
            </v-chip>
          </v-chip-group>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="search"
            hide-details
            append-icon="mdi-magnify"
            solo="solo"
            label="Find your product you wish to purchase..."
            single-line="single-line"
            class="mb-0"
          />
        </v-flex>
        <v-divider />
        <v-list v-if="products.length > 0" three-line class="px-0">
          <template v-for="(item, index) in products">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <Product :key="item.id" :index="index" :product="item" @show-customer="openCustomerDialog" />
            <v-divider :key="index" />
          </template>
        </v-list>
        <v-list-item v-intersect="onIntersect" style="position: relative">
          <v-list-item-title v-if="products.length === 0" class="text-center">
            No Products found.
          </v-list-item-title>
          <v-spacer />
          <v-btn
            v-if="isShopKeeper"
            :to="'/products/edit'"
            color="success"
            bottom
            right
            fab
            small
            fixed
            style="bottom: 12%;"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
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
import Customer from '@/components/customer'
const _ = require('lodash')
// eslint-disable-next-line no-useless-escape
const mobileRegex = /^[6789]\d{9}$/

export default {
  components: {
    Product,
    Shop,
    Customer
  },
  asyncData ({ app, route }) {
    const data = {}
    if (app.$auth && app.$auth.$state && app.$auth.$state.shop) {
      data.shopKeeperId = app.$auth.$state.shop.id
      const { customer } = app.$auth.$state.shop
      if (customer && customer.id) { data.customerId = customer.id }
    }
    return { ...data }
  },
  data: () => ({
    products: [],
    search: '',
    customerId: '',
    shopKeeperId: '',
    showCustomer: false,
    customer: {
      id: '',
      name: '',
      mobile: ''
    },
    isLoaded: false,
    pagination: {
      limit: 20,
      page: 1
    },
    categories: []
  }),
  computed: {
    business () {
      return this.$auth.state.shop || {}
    },
    categoryList () {
      return _.get(this.$auth.state.shop, 'categories') || []
    },
    getMobileNo () {
      return `tel:${this.business.mobile}`
    },
    // filterProducts () {
    //   const products = []
    //   const search = this.search.toLowerCase()
    //   this.products.forEach((product) => {
    //     if (product.title.toLowerCase().includes(search) || product.description.toLowerCase().includes(search)) {
    //       products.push(product)
    //     }
    //   })
    //   return search !== '' ? products : this.products
    // },
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
    },
    isShopKeeper () {
      const role = this.$auth && this.$auth.user && _.first(_.map(this.$auth.user.roles, 'name'))
      return (role === '$sk-admin')
    }
  },
  watch: {
    async categories (values) {
      this.pagination.page = 1
      this.products = []
      this.isLoaded = false
      await this.loadProducts()
    },
    search: _.debounce(async function () {
      this.pagination.page = 1
      this.products = []
      this.isLoaded = false
      await this.loadProducts()
    }, 500)
  },
  async created () {
    await this.loadProducts()
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
    async loadProducts () {
      if (this.isLoaded) { return false }
      const options = {
        limit: this.pagination.limit,
        categories: this.categories,
        q: this.search.toLowerCase(),
        skip: (this.pagination.page - 1) * this.pagination.limit
      }
      const [error, response] = await this.$api.get(`ShopKeepers/${this.shopKeeperId}/getProducts`, { params: { options } })
      if (!error) {
        if (response.data && response.data.length === 0) {
          this.isLoaded = true
        }
        this.products = this.products.concat(response.data)
      }
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
          localStorage.setItem('customer', JSON.stringify(response.data))
          this.showCustomer = false
          window.location.reload(true)
        } else {
          const errorMessage = _.has(error.response.data, 'error.message') ? error.response.data.error.message : ''
          this.$globals.showErrorMessage(errorMessage)
        }
      }
    },
    async onIntersect (entries, observer, isIntersecting) {
      if (isIntersecting) {
        this.pagination.page += 1
        await this.loadProducts()
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
