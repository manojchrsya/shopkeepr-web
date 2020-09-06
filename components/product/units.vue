<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="px-1" small v-bind="attrs" v-on="on">
        <v-icon small> mdi-currency-inr</v-icon> {{ getPricePerUnit }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="rate in price" :key="rate.unit" class="py-1" style="min-height:20px;">
        <v-list-item-title @click="updatePrice(rate)">
          <v-icon small> mdi-currency-inr</v-icon> {{ $globals.formatNumber(rate.value) }} / {{ rate.unit }}
        </v-list-item-title>
        <v-divider />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    price: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getPricePerUnit () {
      return `${this.$globals.formatNumber(this.price)} / ${this.unit}`
    }
  }
}
</script>
