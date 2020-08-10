<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto" color="#26c6da" dark elevation="6">
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                Welcome {{ $globals._.capitalize($auth.user.name.split(' ').splice(0, 1)) }},
              </v-list-item-title>
              <v-list-item-subtitle>{{ currentDateTime }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar color="grey darken-3">
              <v-avatar color="teal">
                <span class="white--text" v-text="$globals.customerInitial($auth.user.name)" />
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
      <v-card elevation="6" class="mt-2">
        <!-- <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-flex>
                <v-chip
                  class="ma-2"
                  label
                >
                  Sales
                </v-chip>
                <v-spacer />
                <v-chip
                  class="ma-2"
                  color="green"
                  text-color="white"
                >
                  {{ summary.month }}
                </v-chip>
              </v-flex>
            </v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions> -->
        <v-card-text style="position: relative;">
          <v-row style="position: absolute;right: 0px;top: 0px;">
            <v-col class="py-0" cols="12">
              <v-chip
                color="green"
                text-color="white"
                label
              >
                {{ summary.month }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col align="center" cols="12">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="display-3">
                    {{ $globals.formatNumber(summary.revenue.total) }} <v-icon class="display-2 mb-3">
                      mdi-currency-inr
                    </v-icon>
                  </v-list-item-title>
                  <v-list-item-subtitle>Revenue Amount</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
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
      <v-card elevation="6" class="mt-2">
        <v-card-title class="pb-0">
          <div class="layout row ma-0">
            <div class="subheading">
              Account
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <e-chart
            :path-option="[
              ['dataset.source', lastWeekDetails],
              ['color', ['#59d955', '#ff4a37']],
              ['legend.show', true],
              ['xAxis.axisLabel.show', true],
              ['xAxis.type', 'value'],
              ['yAxis.type', 'category'],
              ['yAxis.axisLabel.show', true],
              ['yAxis.axisTick', false],
              ['grid.left', '2%'],
              ['grid.bottom', '5%'],
              ['grid.right', '3%'],
              ['series[0].type', 'bar'],
              ['series[0].areaStyle', {}],
              ['series[0].smooth', true],
              ['series[1].smooth', true],
              ['series[1].type', 'bar'],
              ['series[1].areaStyle', {}],
            ]"
          />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import EChart from '@/components/chart/echart'

import 'echarts/lib/component/legend'

export default {
  components: {
    EChart
  },
  async asyncData ({ app }) {
    const result = {}
    const [error, response] = await app.$api.get('ShopKeepers/dashboard')
    if (!error) {
      result.lastWeek = response.data.lastWeek
      result.summary = response.data.summary
    }
    return result
  },
  data () {
    return {
      summary: {},
      time: 0,
      lastWeek: []
    }
  },
  computed: {
    currentDateTime () {
      return this.$moment().format('llll')
    },
    lastWeekDetails () {
      // eslint-disable-next-line
      const lastWeekDays = this.getLastWeekDays()
      // const weekDays = ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA']
      const lastWeekData = _.groupBy(this.lastWeek, 'date')
      return lastWeekDays.map((data) => {
        const details = {
          day: data.day,
          Credit: 0,
          Debit: 0
        }
        if (lastWeekData[data.date]) {
          const lastWeekCredit = _.find(lastWeekData[data.date], { type: 'CREDIT' }) || {}
          const lastWeekDebit = _.find(lastWeekData[data.date], { type: 'DEBIT' }) || {}
          details.Credit = lastWeekCredit.total || 0
          details.Debit = lastWeekDebit.total || 0
        }
        return details
      })
    }
  },
  methods: {
    getLastWeekDays () {
      const days = []
      for (let i = 0; i < 7; i++) {
        const currentDay = this.$moment().subtract(i, 'days')
        days.push({ date: currentDay.format('YYYY-MM-DD'), day: currentDay.format('ddd').toUpperCase() })
      }
      return days.reverse()
    }
  }
}
</script>
