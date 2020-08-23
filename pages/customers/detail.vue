<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/customers/list'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>{{ customer.name }}</v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line class="mt-2">
          <v-list-item-content v-if="customer.summary.dueAmount > 0" class="pb-0">
            <v-list-item-subtitle color="error">
              Total due amount
            </v-list-item-subtitle>
            <v-list-item-title class="display-1">
              {{ $globals.formatNumber(customer.summary.dueAmount) }} <v-icon class="display-1 mb-1">
                mdi-currency-inr
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-else class="pb-0">
            <v-list-item-subtitle color="success">
              Advanced paid amount
            </v-list-item-subtitle>
            <v-list-item-title class="display-1">
              {{ $globals.formatNumber(customer.summary.advanceAmount) }} <v-icon class="display-1 mb-1">
                mdi-currency-inr
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
          <v-badge
            avatar
            bordered
            overlap
            icon="mdi-pencil"
          >
            <v-list-item-avatar class="my-0 mx-0" color="grey darken-3" @click.prevent="$router.push('/customers/add?id='+customer.id)">
              <v-avatar color="teal">
                <span class="white--text" v-text="$globals.customerInitial(customer.name)" />
              </v-avatar>
            </v-list-item-avatar>
          </v-badge>
        </v-list-item>
        <v-card-text>
          <v-layout>
            <v-flex class="py-0" xs12>
              <v-text-field
                v-model="payment.actualAmount"
                label="Actual Invoice Amount"
                solo
                append-icon="mdi-currency-inr"
                dense
                single-line
                :error-messages="actualAmountErrors"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex class="py-0" xs12>
              <v-text-field
                v-model="payment.receivedAmount"
                label="Received Amount"
                solo
                append-icon="mdi-currency-inr"
                dense
                single-line
                :error-messages="receivedAmountErrors"
              />
            </v-flex>
          </v-layout>
          <v-flex class="py-0" xs12>
            <v-textarea
              v-model="payment.remarks"
              value=""
              placeholder="Sold item details with comma seperated..."
              append-icon="mdi-information"
              single-line
              dense
              solo
              :error-messages="remarksErrors"
            />
          </v-flex>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark @click="createTransaction">
              Add Payment
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-row>
        <v-col class="pr-1" cols="6">
          <v-card elevation="6" class="mt-1">
            <v-list-item class="pr-0" style="postion: relative;">
              <v-list-item-content>
                <v-list-item-subtitle>Total Credit</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold mt-1">
                  {{ $globals.formatNumber(customer.summary.credit.total) }}  <v-icon small class="mb-1">
                    mdi-currency-inr
                  </v-icon>
                </v-list-item-title>
              </v-list-item-content>
              <v-btn icon class="pr-3" color="success" dark>
                <v-icon absolute top right>
                  mdi-arrow-bottom-left-thick
                </v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col class="pl-1" cols="6">
          <v-card elevation="6" class="mt-1">
            <v-list-item class="pr-0" style="postion: relative;">
              <v-list-item-content>
                <v-list-item-subtitle> Total Debit </v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold mt-1">
                  {{ $globals.formatNumber(customer.summary.debit.total) }} <v-icon small class="mb-1">
                    mdi-currency-inr
                  </v-icon>
                </v-list-item-title>
              </v-list-item-content>
              <v-btn icon class="pr-3" color="error" dark>
                <v-icon absolute top right>
                  mdi-arrow-top-right-thick
                </v-icon>
              </v-btn>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <Transaction :transactions="customer.transactions" :summary="customer.summary" :source="'customer'" />
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required, numeric
} from 'vuelidate/lib/validators'
import Transaction from '@/components/transaction'

export default {
  components: {
    Transaction
  },
  async asyncData ({ app, route }) {
    if (route && route.query && route.query.id) {
      const customerId = route.query.id
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await app.$api.get(`Customers/${customerId}/getDetails`)
      if (!error) {
        const customer = response.data
        customer.summary = customer.summary || {
          credit: { total: 0 },
          debit: { total: 0 },
          revenue: { total: 0 },
          dueAmount: 0,
          advanceAmount: 0
        }
        return { customer }
      }
    }
  },
  data: () => ({
    customer: {
      name: '',
      mobile: '',
      summary: {},
      transactions: []
    },
    payment: {
      actualAmount: '',
      receivedAmount: '',
      remarks: ''
    }
  }),
  computed: {
    actualAmountErrors () {
      const errors = []
      if (!this.$v.payment.actualAmount.$dirty) { return errors }
      if (!this.$v.payment.actualAmount.required) { errors.push('Actual Amount is required.') }
      if (!this.$v.payment.actualAmount.numeric) { errors.push('Actual Amount should be numeric.') }
      return errors
    },
    receivedAmountErrors () {
      const errors = []
      if (!this.$v.payment.receivedAmount.$dirty) { return errors }
      if (!this.$v.payment.receivedAmount.required) { errors.push('Received Amount is required.') }
      if (!this.$v.payment.receivedAmount.numeric) { errors.push('Received Amount should be numeric.') }
      return errors
    },
    remarksErrors () {
      const errors = []
      if (!this.$v.payment.remarks.$dirty) { return errors }
      if (!this.$v.payment.remarks.required) { errors.push('Remarks is required.') }
      return errors
    }
  },
  methods: {
    async createTransaction () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const formData = {
          actualAmount: this.payment.actualAmount,
          receivedAmount: this.payment.receivedAmount,
          remarks: this.payment.remarks
        }
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await this.$api.post(`Customers/${this.customer.id}/addTransaction`, formData)
        if (!error && response) {
          window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
            message: 'Transaction saved successfully!!!'
          })
          this.payment.actualAmount = ''
          this.payment.receivedAmount = ''
          this.payment.remarks = ''
          this.$nextTick(() => { this.$v.$reset() })
          this.customer = response.data
        }
      }
    }
  },
  validations: {
    payment: {
      actualAmount: {
        required,
        numeric
      },
      receivedAmount: {
        required,
        numeric
      },
      remarks: {
        required
      }
    }
  }
}
</script>
