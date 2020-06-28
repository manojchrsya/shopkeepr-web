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
            <v-date-picker v-model="date" @input="menu2 = false" />
          </v-menu>
        </v-list-item>
        <v-card-text class="py-0">
          <e-chart
            :path-option="[
              ['dataset.source', locationData],
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
                  1,50,00,00 <v-icon small class="mb-1">
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
                  1,50,00,00 <v-icon small class="mb-1">
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
      <v-card>
        <v-card-subtitle class="font-weight-bold">
          Transactions
        </v-card-subtitle>
        <v-divider />
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-item
              :key="item.index"
            >
              <v-list-item-avatar>
                <v-btn :color="item.color" fab x-small dark>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-btn>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-subtitle v-bind="attrs" v-on="on" v-text="item.subtitle" />
                  </template>
                  <span v-html="item.subtitle.split(',').join('<br>')" />
                </v-tooltip>
              </v-list-item-content>

              <v-list-item-action class="pr-0">
                <v-list-item-title class="font-weight-bold mt-1">
                  {{ item.amount }} <v-icon small class="mb-1">
                    mdi-currency-inr
                  </v-icon>
                </v-list-item-title>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index !== (items.length - 1)" :key="index" />
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import EChart from '@/components/chart/echart'
import 'echarts/lib/component/legend'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    EChart
  },
  data: () => ({
    menu2: false,
    date: new Date().toISOString().substr(0, 10),
    paymentOptions: ['Credit', 'Debit'],
    items: [
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '5,00,000', subtitle: '1 Paan, 2 mava, 1 goldflak, 1 Paan, 2 mava, 1 goldflak', title: 'Manoj Chaurasiya' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50,000', subtitle: '1 Hathi', title: 'Ramkisan Prajapati' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', subtitle: '5 Rupa', title: 'Bhim Sharma' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Manoj Chaurasiya' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Ramkisan Prajapati' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Ramkisan Prajapati' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Ramkisan Prajapati' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Bhim Sharma' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', subtitle: '4 Chuna, 4 Paan', title: 'Bhim Sharma' }
    ],
    locationData: [
      {
        value: 50,
        name: 'Credit'
      },
      {
        value: 35,
        name: 'Debit'
      }
    ]
  }),
  computed: {
    siteTrafficData () {
      const shortMonth = ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA']
      return shortMonth.map((m) => {
        return {
          month: m,
          Credit: Math.floor(Math.random() * 1000) + 200,
          Debit: Math.floor(Math.random() * 1000) + 250
        }
      })
    }
  },
  methods: {
    dateSelected (dateEvent) {
      // eslint-disable-next-line no-console
      console.log(dateEvent)
    }
  }
}
</script>
