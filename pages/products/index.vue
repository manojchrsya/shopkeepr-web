
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
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-bottom-navigation color="tranparent">
          <v-btn>
            <span>1 Day</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn>
            <span>Location</span>
            <v-icon>mdi-map-marker-outline</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn>
            <span>220$</span>
            <v-icon>mdi-shopping-outline</v-icon>
          </v-btn>
        </v-bottom-navigation>
        <v-divider />
        <!-- <v-list two-line>
          <template v-for="(product, index) in products">
            <v-card :key="index" class="mx-auto">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" />
              <v-card-title>
                Top western road trips
              </v-card-title>
              <v-card-subtitle>
                1,000 miles of wonder
              </v-card-subtitle>
              <v-card-actions>
                <v-btn text>
                  Share
                </v-btn>

                <v-btn
                  color="purple"
                  text
                >
                  Explore
                </v-btn>
                <v-spacer />
                <v-btn
                  icon
                  @click="show = !show"
                >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider />
                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </template>
          <v-list-item style="position: relative">
            <v-list-item-content v-if="products.length === 0" style="text-align:center;">
              <v-list-item-title>
                No Customer found.
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer />
            <v-btn
              :to="'/customers/add'"
              dark
              bottom
              right
              fab
              small
              fixed
              style="bottom: 12%;"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item>
        </v-list> -->
      </v-card>
      <!-- <v-row dense>
        <v-col v-for="(product, index) in products" :key="index" :cols="12">
          <v-card class="mx-auto">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="150px"
            />

            <v-card-title>
              Top western road trips
            </v-card-title>

            <v-card-subtitle>
              1,000 miles of wonder
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text>
                Share
              </v-btn>

              <v-btn
                color="purple"
                text
              >
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> -->
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data: () => ({
    products: [
      {
        name: 'Paan'
      },
      {
        name: 'Maava'
      },
      {
        name: 'Gold Flack'
      },
      {
        name: 'Four Sqaure'
      }
    ],
    show: false,
    search: ''
  })
}
</script>
