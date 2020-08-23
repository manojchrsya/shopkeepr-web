<template>
  <v-card>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>All Transactions</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-list-item-title class="font-weight-bold mt-1">
          {{ $globals.formatNumber(summary.revenue.total) }} <v-icon small class="mb-1">
            mdi-currency-inr
          </v-icon>
        </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
    <v-list v-if="transactions.length > 0" class="pt-0">
      <template v-for="(txn, index) in transactions">
        <v-list-item
          :key="txn.id"
        >
          <v-list-item-avatar>
            <v-btn v-if="txn.type === 'SETTLED'" color="warning" fab x-small dark>
              <v-icon>mdi-arrow-down-thick</v-icon>
            </v-btn>
            <v-btn v-else :color="txn.type === 'CREDIT' ? 'success': 'error'" fab x-small dark>
              <v-icon>{{ txn.type === 'CREDIT' ? 'mdi-arrow-top-right-thick': 'mdi-arrow-bottom-left-thick' }}</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-content v-if="!showCustomer">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on" v-text="txn.remarks" />
              </template>
              <span v-html="(txn.remarks || '').split(',').join('<br>')" />
            </v-tooltip>
            <v-list-item-subtitle>
              {{ $moment(txn.createdOn).fromNow() }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title v-text="txn.customer && txn.customer.name" />
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-subtitle v-bind="attrs" v-on="on" v-text="txn.remarks" />
              </template>
              <span v-html="txn.remarks.split(',').join('<br>')" />
            </v-tooltip>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text class="mt-1">
              <span class="font-weight-bold">{{ $globals.formatNumber(txn.amount) }}</span> <v-icon small class="mb-1">
                mdi-currency-inr
              </v-icon>
            </v-list-item-action-text>
            <v-btn icon :to="'/transactions/detail?id='+txn.id+'&source='+source">
              <v-icon color="black lighten-1">
                mdi-arrow-down-drop-circle-outline
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index !== (transactions.length - 1)" :key="index" />
      </template>
    </v-list>
    <v-list-item v-else>
      <v-list-item-content>
        <v-list-item-title style="text-align:center;">
          No Transactions found.
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    transactions: {
      type: Array,
      default: () => []
    },
    summary: {
      type: Object,
      default: () => {}
    },
    source: {
      type: String,
      default: 'transaction'
    },
    showCustomer: {
      type: Boolean,
      default: false
    }
  }
}
</script>
