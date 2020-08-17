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
              <v-list-item-subtitle>#12334343534</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-btn color="red" fab x-small dark>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item height="5">
            <v-list-item-content class="py-0">
              <v-list-item-subtitle>Transacted On</v-list-item-subtitle>
              <v-list-item-subtitle>15 August 2020, Sat, 10:30 PM</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn v-if="transaction.type === 'SETTLED'" color="warning" fab x-small dark>
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>
              <v-btn v-else :color="transaction.type === 'CREDIT' ? 'success': 'error'" fab x-small dark>
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
              <v-list-item-title>Manoj Chaurasiya</v-list-item-title>
              <v-list-item-subtitle style="white-space: normal;">
                hi sis test that, it ss dhsds, asdasd, asdasd, asdasddsdssd asdasdds, asdasdds
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-title class="font-weight-bold mt-1">
                21,023 <v-icon small class="mb-1">
                  mdi-currency-inr
                </v-icon>
              </v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const _ = require('lodash')

export default {
  data: () => ({
    remarks: 'This si test',
    transaction: {
      type: 'SETTLED'
    },
    source: 'transaction'
  }),
  computed: {
    getLastRoute () {
      return this.source === 'transaction' ? '/transactions' : '/customers/list'
    },
    business () {
      const details = _.first(this.$auth.state.shop) || {}
      return {
        Name: details.displayName,
        Mobile: details.mobile,
        'GST Number': details.gstNumber || '-',
        'Pan Card': details.pancard || '-'
      }
    },
    customer () {
      const details = this.$auth.user
      return {
        Name: details.name,
        Mobile: details.mobile,
        Email: details.email
      }
    }
  }
}
</script>
