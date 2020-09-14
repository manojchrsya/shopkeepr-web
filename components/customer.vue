<template>
  <v-card class="mx-auto" color="cyan" dark elevation="6">
    <v-card-text v-if="customer && customer.id" class="py-0">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">
            Welcome {{ $globals._.capitalize(customer.name.split(' ').splice(0, 1)) }},
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon color="tranparent" @click.prevent="customerLogout">
            <v-icon color="white lighten-1">mdi-logout</v-icon>
          </v-btn>
          <v-list-item-action-text color="white font-weight-bold">Logout</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
    <v-toolbar v-else color="cyan">
      <v-flex xs12>
        <!-- <v-text-field
          append-icon="mdi-magnify"
          solo="solo"
          label="Search products..."
          single-line="single-line"
        /> -->
        <v-card-title v-text="title" />
      </v-flex>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    customer () {
      return this.$globals.currentCustomer()
    }
  },
  methods: {
    customerLogout () {
      localStorage.removeItem('customer')
      window.location.reload(true)
    }
  }
}
</script>
