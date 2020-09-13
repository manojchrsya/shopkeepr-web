<template>
  <v-list-item class="px-2">
    <v-list-item-content>
      <v-list-item-title v-text="order.title" />
    </v-list-item-content>
    <v-list-item-content>
      <v-list-item-subtitle>
        <v-btn class="px-1 info" small>{{ order.quantity }} {{ order.unit }}</v-btn>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-layout>
        <v-flex class="py-0 pl-3">
          <v-list-item-title class="font-weight-bold">
            {{ $globals.formatNumber(order.amount) }}
            <v-icon small class="mb-1">
              mdi-currency-inr
            </v-icon>
          </v-list-item-title>
        </v-flex>
      </v-layout>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  }
}
</script>
