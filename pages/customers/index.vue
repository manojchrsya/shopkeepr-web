
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
              label="Search customer and mobile no"
              single-line="single-line"
            />
          </v-flex>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in filterCustomers">
            <v-list-item
              :key="item.id"
              :to="'/customers/detail?id='+item.id"
            >
              <v-list-item-avatar>
                <v-avatar color="teal">
                  <span class="white--text" v-text="$globals.customerInitial(item.name)" />
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title :key="index" v-text="item.name" />
                <v-list-item-subtitle v-text="item.mobile || '-'" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon :to="'/customers/add?id='+item.id">
                  <v-icon color="grey lighten-1">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider v-if="index !== customers.length" :key="index" />
          </template>
          <v-list-item style="position: relative">
            <v-list-item-content v-if="filterCustomers.length === 0" style="text-align:center;">
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
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  async asyncData ({ app }) {
    const [error, response] = await app.$api.get('Customers', { params: { filter: { order: 'createdOn desc' } } })
    if (!error) {
      return {
        customers: response.data
      }
    }
  },
  data: () => ({
    customers: [],
    search: ''
  }),
  computed: {
    filterCustomers () {
      const customers = []
      const search = this.search.toLowerCase()
      this.customers.forEach((customer) => {
        if (customer.name.toLowerCase().includes(search) || customer.mobile.toLowerCase().includes(search)) {
          customers.push(customer)
        }
      })
      return search !== '' ? customers : this.customers
    }
  }
}
</script>
