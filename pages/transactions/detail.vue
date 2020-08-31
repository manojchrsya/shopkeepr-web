<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn v-if="source" icon :to="getLastRoute">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>Transaction Details</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card class="mx-auto my-2 px-0">
        <v-list subheader>
          <v-list-item height="5">
            <v-list-item-content class="py-2">
              <v-list-item-subtitle>TransactionID</v-list-item-subtitle>
              <v-list-item-subtitle>#{{ transaction.id }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-btn color="red" icon dark @click="showConfirmation = true">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item height="5">
            <v-list-item-content class="py-0">
              <v-list-item-subtitle>Transacted On</v-list-item-subtitle>
              <v-list-item-subtitle>{{ $moment(transaction.createdOn).format('MMMM Do YYYY, h:mm A') }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn v-if="transaction.type === 'SETTLED'" color="warning" icon dark>
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>
              <v-btn v-else :color="transaction.type === 'CREDIT' ? 'success': 'error'" icon dark>
                <v-icon>{{ transaction.type === 'CREDIT' ? 'mdi-arrow-top-right-thick': 'mdi-arrow-bottom-left-thick' }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card class="mx-auto my-2 px-0">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-text="transaction.customer && transaction.customer.name" />
              <v-list-item-subtitle style="white-space: normal;">
                {{ transaction.remarks }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-title class="font-weight-bold mt-1">
                {{ $globals.formatNumber(transaction.amount) }} <v-icon small class="mb-1">
                  mdi-currency-inr
                </v-icon>
              </v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
      <v-dialog v-model="showConfirmation" max-width="400">
        <v-card>
          <v-card-title class="headline">
            Delete Transaction
          </v-card-title>
          <v-card-text class="py-0">
            <p> Are you sure, you want to delete this transaction? </p>
            <p v-if="transaction.invoiceId" style="color:#2196f3;">
              Note: This could impact your <strong>total revenue</strong>.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click.prevent="showConfirmation = false">
              Cancel
            </v-btn>
            <v-btn color="error" @click.prevent="deleteTransaction">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData ({ app, route }) {
    if (route && route.query && route.query.id) {
      const txnId = route.query.id
      const source = route.query.source || 'transaction'
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await app.$api.get('Customers/getTxnDetail', { params: { options: { txnId } } })
      if (!error) {
        return { transaction: response.data, source }
      }
    }
  },
  data: () => ({
    transaction: {},
    source: '',
    showConfirmation: false
  }),
  computed: {
    getLastRoute () {
      return this.source === 'transaction' ? '/transactions' : `/customers/detail?id=${this.transaction.customer.id}`
    }
  },
  methods: {
    async deleteTransaction () {
      const formData = {
        txnId: this.transaction.id
      }
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await this.$api.post('Customers/deleteTransaction', formData)
      if (!error && response) {
        window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
          message: 'Transaction deleted successfully!!!'
        })
        this.$nextTick(() => { this.$router.push(this.getLastRoute) })
      }
    }
  }
}
</script>
