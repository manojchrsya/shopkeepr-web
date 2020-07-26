<template>
  <v-app>
    <v-main>
      <v-container class="py-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="px-0 py-0">
      <v-bottom-navigation v-model="bottomNav" grow light fixed app>
        <v-btn href="/dashboard">
          <span>Dashboard</span>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
        <v-btn href="/customers/list">
          <span>Customer</span>
          <v-icon>mdi-account-box-multiple</v-icon>
        </v-btn>
        <v-btn href="/transactions">
          <span>Transactions</span>
          <v-icon>mdi-currency-inr</v-icon>
        </v-btn>
        <v-btn href="/profile">
          <span>Profile</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      bottomNav: 0
    }
  }
}
</script>
