<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/products'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>My Bucket</v-toolbar-title>
        </v-toolbar>
        <v-list two-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Veg Saagar Resaurant (Pure Veg)</v-list-item-title>
              <v-list-item-subtitle>Paan Shop | Bhayander (e)</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-if="items.length > 0" class="mt-2">
        <v-list class="px-0">
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header" v-text="item.header" />
            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset" />
            <v-list-item v-else :key="item.title">
              <!-- <v-list-item-icon class="mx-2">
                <v-img :border-radius="10" :src="item.avatar" :max-height="30" :max-width="30" />
              </v-list-item-icon> -->
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
              <v-list-item-action class="mx-0 mb-0">
                <v-layout>
                  <v-flex class="py-0">
                    <v-icon class="mx-0" color="success" style="font-size: 15px;">
                      mdi-minus
                    </v-icon>
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
                  <v-flex class="py-0 pr-4">
                    <v-icon class="mx-0" color="success" style="font-size: 15px;">
                      mdi-plus
                    </v-icon>
                  </v-flex>
                  <v-flex class="py-0">
                    <v-list-item-title class="mt-1">
                      {{ $globals.formatNumber(item.price) }}
                      <v-icon small class="mb-1">
                        mdi-currency-inr
                      </v-icon>
                    </v-list-item-title>
                  </v-flex>
                </v-layout>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-divider />
          <v-subheader class="text-right">
            <v-spacer />
            Total:
            <div class="font-weight-bold pl-2">
              34,444<v-icon small class="mb-1">
                mdi-currency-inr
              </v-icon>
            </div>
          </v-subheader>
        </v-list>
        <v-divider />
        <v-card-text class="py-0 pt-1">
          <v-flex class="py-0" xs12>
            <v-textarea
              placeholder="Any other special request, will pass it to shopkeeper..."
              append-icon="mdi-information"
              single-line
              dense
              solo
              :rows="3"
            />
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark>
              Place order
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="text-align:center;">
              No item found in bucket.
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
