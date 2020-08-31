<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card flat class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-flex class="mt-7" xs12>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              solo="solo"
              label="Search products..."
              single-line="single-line"
            />
          </v-flex>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Veg Saagar Resaurant (Pure Veg)</v-list-item-title>
              <v-list-item-subtitle>Paan Shop | Bhayander (e)</v-list-item-subtitle>
              <v-list-item-subtitle>
                Minimun order with 2,200 <v-icon small class="mb-1">
                  mdi-currency-inr
                </v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-bottom-navigation color="tranparent">
          <v-btn>
            <span>1 Day</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn :href="'tel:+919987492873'">
            <span>Call Now</span>
            <v-icon>mdi-cellphone-basic</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn :to="'/bucket'">
            <span>Basket</span>
            <v-icon>mdi-basket-outline</v-icon>
          </v-btn>
        </v-bottom-navigation>
        <v-divider />
        <v-list v-if="items.length > 0" three-line class="px-0">
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset" />
            <v-list-item v-else :key="item.title" class="px-2">
              <!-- <v-list-item-icon class="mx-2">
                <v-img :border-radius="10" :src="item.avatar" :max-height="60" :max-width="50" />
              </v-list-item-icon> -->
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
                <v-list-item-subtitle v-html="item.subtitle" />
              </v-list-item-content>
              <v-list-item-action class="mx-0 mb-0">
                <v-list-item-title class="font-weight-bold mt-1 text-right">
                  {{ $globals.formatNumber(item.price) }}
                  <v-icon small class="mb-1">
                    mdi-currency-inr
                  </v-icon>
                </v-list-item-title>
                <v-layout class="mt-1">
                  <v-flex class="py-0">
                    <v-btn :height="20" :min-width="20" class="mr-2">
                      <v-icon class="mx-0" color="success">
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex class="py-0">
                    <v-text-field
                      dense
                      single-line
                      :value="0"
                      class="centered-input"
                      style="width: 20px;"
                    />
                  </v-flex>
                  <v-flex class="py-0">
                    <v-btn :height="20" :min-width="20" class="ml-2">
                      <v-icon class="mx-0" color="success">
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title style="text-align:center;">
              No Product found.
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data: () => ({
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Paan & Maava',
        price: 20,
        subtitle: 'Full custom with multiple flevour. choose you own ingredient and just wait for delevery...'
      },
      { divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        price: 20,
        title: 'Gold Flak',
        subtitle: 'Gold flak with new flavour, touch and minimun price.'
      },
      { divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Four Sqaure',
        price: 20,
        subtitle: 'Do you have Paris recommendations? Have you ever been?'
      },
      { divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Hathi Chhap',
        price: 20,
        subtitle: 'Have any ideas about what we should get Heidi for her birthday'
      },
      { divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Meetha Paan',
        price: 20,
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      }
    ],
    search: ''
  })
}
</script>
<style scoped>
.centered-input >>> input {
  text-align: center
}
</style>
