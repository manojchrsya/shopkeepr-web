<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/products'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>My Bucket</v-toolbar-title>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ business.displayName }}</v-list-item-title>
              <v-list-item-subtitle>{{ business.tagLine }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar class="my-0 mx-0" color="grey darken-3">
              <v-avatar color="teal">
                <span class="white--text" v-text="$globals.customerInitial(business.displayName)" />
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-if="products.length > 0" class="mt-2">
        <v-list class="px-0">
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
          <v-divider />
          <v-subheader class="text-right">
            <v-spacer />
            Total:
            <div class="font-weight-bold pl-2">
              34,444<v-icon small class="mb-1">
                mdi-currency-inr
              </v-icon>
            </div>
          </v-subheader>
        </v-list>
        <v-divider />
        <v-card-text class="py-0 pt-1">
          <v-flex class="py-0" xs12>
            <v-textarea
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
            <v-btn color="success" block dark>
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
const _ = require('lodash')

export default {
  components: {
    Product
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
    if (data.customerId && data.shopKeeperId) {
      const [error, response] = await app.$api.get(`Customers/${data.customerId}/getBucket`, {
        params: { options: { shopKeeperId: data.shopKeeperId } }
      })
      if (!error) { data.products = response.data }
    }
    return { ...data }
  },
  data: () => ({
    products: [],
    search: '',
    showCustomer: false
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
    deleteProduct (data) {
      this.products.splice(data.index, 1)
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
