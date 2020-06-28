<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon href="/customers">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>Manoj's Detail</v-toolbar-title>
        </v-toolbar>
        <v-list-item three-line class="mt-2">
          <v-list-item-content class="pb-0">
            <v-list-item-subtitle>Total pending amount</v-list-item-subtitle>
            <v-list-item-title class="display-1">
              5,670 <v-icon class="display-1 mb-1">
                mdi-currency-inr
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar class="mt-5" color="grey darken-3">
            <v-img
              class="elevation-6"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            />
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions class="pb-0">
          <v-flex class="py-0" xs7>
            <v-text-field
              label="Amount"
              solo
              append-icon="mdi-currency-inr"
              dense
              single-line
            />
          </v-flex>
          <v-spacer />
          <v-flex class="py-0" xs4>
            <v-select
              single-line
              dense
              value="Credit"
              :items="paymentOptions"
              label="Payment Type"
              solo
            />
          </v-flex>
        </v-card-actions>
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark>
              Pay Now
            </v-btn>
          </v-flex>
        </v-card-actions>
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
          Last transactions
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
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-title v-bind="attrs" v-on="on" v-text="item.title" />
                  </template>
                  <span v-html="item.title.split(',').join('<br>')" />
                </v-tooltip>
                <v-list-item-subtitle v-text="item.subtitle" />
              </v-list-item-content>

              <v-list-item-action>
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

export default {
  data: () => ({
    paymentOptions: ['Credit', 'Debit'],
    items: [
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '5,00,000', title: '1 Paan, 2 mava, 1 goldflak, 1 Paan, 2 mava, 1 goldflak', subtitle: 'today at 1 pm' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50,000', title: '1 Hathi', subtitle: 'yesterday' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', title: '5 Rupa', subtitle: '24 june 2020' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '3 days ago' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '1 week ago' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '5 days ago' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '5 days ago' },
      { icon: 'mdi-arrow-bottom-left-thick', color: 'error', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '5 days ago' },
      { icon: 'mdi-arrow-top-right-thick', color: 'success', amount: '50', title: '4 Chuna, 4 Paan', subtitle: '5 days ago' }
    ]
  })
}
</script>
