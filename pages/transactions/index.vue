<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-toolbar-title>Transactions Detail</v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line class="mt-2">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Select Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="date" :max="maxAllowedDate" @input="menu2 = false" @change="getTxnDetail" />
          </v-menu>
        </v-list-item>
        <v-card-text class="py-0">
          <e-chart
            :path-option="[
              ['dataset.source', transactionData],
              ['legend.show', true],
              ['legend.orient', 'horizontal'],
              ['legend.left', 'left'],
              ['color', ['#59d955', '#ff4a37']],
              ['xAxis.show', false],
              ['yAxis.show', false],
              ['series[0].type', 'pie'],
              ['series[0].avoidLabelOverlap', true],
              ['series[0].radius', '55%'],
              ['series[0].label.normal.show', false],
            ]"
            height="250px"
            width="100%"
          />
        </v-card-text>
      </v-card>
      <v-row>
        <v-col class="pr-1" cols="6">
          <v-card elevation="6" class="mt-1">
            <v-list-item class="pr-0" style="postion: relative;">
              <v-list-item-content>
                <v-list-item-subtitle>Credit</v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold mt-1">
                  {{ $globals.formatNumber(summary.credit.total) }}  <v-icon small class="mb-1">
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
                <v-list-item-subtitle> Debit </v-list-item-subtitle>
                <v-list-item-title class="font-weight-bold mt-1">
                  {{ $globals.formatNumber(summary.debit.total) }} <v-icon small class="mb-1">
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
      <Transaction :transactions="transactions" :summary="summary" :show-customer="true" />
    </v-flex>
  </v-layout>
</template>

<script>
import EChart from '@/components/chart/echart'
import 'echarts/lib/component/legend'
import Transaction from '@/components/transaction'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EChart,
    Transaction
  },
  async asyncData ({ app }) {
    const result = {}
    const [error, response] = await app.$api.get('ShopKeepers/getTxnDetails')
    if (!error) {
      result.transactions = response.data.transactions
      result.summary = response.data.summary || {
        credit: { total: 0 },
        debit: { total: 0 },
        revenue: { total: 0 },
        dueAmount: 0,
        advanceAmount: 0
      }
    }
    return { ...result }
  },
  data: () => ({
    menu2: false,
    transactions: [],
    summary: {},
    date: new Date().toISOString().substr(0, 10)
  }),
  computed: {
    transactionData () {
      return [
        {
          value: this.summary.credit ? this.summary.credit.total : 0,
          name: 'Credit'
        },
        {
          value: this.summary.debit ? this.summary.debit.total : 0,
          name: 'Debit'
        }
      ]
    },
    maxAllowedDate () {
      return this.$moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    async getTxnDetail (date) {
      const [error, response] = await this.$api.get('ShopKeepers/getTxnDetails', { params: { options: { date } } })
      if (!error) {
        this.transactions = response.data.transactions
        this.summary = response.data.summary
      }
    }
  }
}
</script>
