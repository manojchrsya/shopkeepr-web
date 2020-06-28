<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto" color="#26c6da" dark elevation="6">
        <v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                Welcome Manoj,
              </v-list-item-title>
              <v-list-item-subtitle>Mon, 12:30 PM</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-card-text>
      </v-card>
      <v-card elevation="6" class="mt-2">
        <v-card-text>
          <v-row align="center">
            <v-col align="center" cols="12">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="display-3">
                    5670 <v-icon class="display-2 mb-3">
                      mdi-currency-inr
                    </v-icon>
                  </v-list-item-title>
                  <v-list-item-subtitle>Today's total earnigns</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col align="center" class="pr-1" cols="6">
          <v-card elevation="6" class="mt-2">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>Credit</v-list-item-subtitle>
                <v-list-item-title class="headline">
                  1,500 <v-icon class="headline mb-2">
                    mdi-currency-inr
                  </v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col align="center" class="pl-1" cols="6">
          <v-card elevation="6" class="mt-2">
            <v-list-item-content>
              <v-list-item-subtitle>Debit</v-list-item-subtitle>
              <v-list-item-title class="headline">
                1,500 <v-icon class="headline mb-2">
                  mdi-currency-inr
                </v-icon>
              </v-list-item-title>
            </v-list-item-content>
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
              ['dataset.source', siteTrafficData],
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
import EChart from '@/components/chart/echart'
import 'echarts/lib/component/legend'
export default {
  components: {
    EChart
  },
  data () {
    return {
      time: 0
    }
  },
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
  }
}
</script>
