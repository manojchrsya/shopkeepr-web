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
          <v-btn icon color="tranparent" @click.prevent="$auth.logout(); $firebase.removeToken()">
            <v-icon color="white lighten-1">mdi-logout</v-icon>
          </v-btn>
          <v-list-item-action-text color="white font-weight-bold">Logout</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-card-text>
    <v-toolbar v-else color="cyan">
      <v-card-title v-text="title" />
      <v-spacer />
      <v-btn icon color="tranparent" @click.prevent="$auth.logout(); $firebase.removeToken();">
        <v-icon color="white lighten-1">mdi-logout</v-icon>
      </v-btn>
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
      return this.$auth.$state.shop && this.$auth.$state.shop.customer
    }
  }
}
</script>
