
<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-flex class="mt-7" xs12>
            <v-text-field
              append-icon="mdi-magnify"
              solo="solo"
              label="Search customer and mobile no"
              single-line="single-line"
            />
          </v-flex>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in customers">
            <v-list-item
              :key="item.id"
              href="/customers/detail"
            >
              <v-list-item-avatar>
                <v-img :src="item.profilePic" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title :key="index" v-text="item.name" />
                <v-list-item-subtitle v-text="item.mobile || '-'" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon :to="'/customers/add?id='+item.id">
                  <v-icon color="grey lighten-1">
                    mdi-details
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index !== (customers.length - 1)" :key="index" />
          </template>
          <v-list-item style="position: relative">
            <v-spacer />
            <v-btn
              href="/customers/add"
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
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  async asyncData ({ app }) {
    const [error, response] = await app.$api.get('Customers')
    if (!error) {
      return {
        customers: response.data
      }
    }
  },
  data: () => ({
    customers: []
  })
}
</script>
