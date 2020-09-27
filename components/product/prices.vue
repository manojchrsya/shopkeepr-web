<template>
  <v-layout>
    <v-flex xs5>
      <v-text-field
        v-model="amount.value"
        label="Amount"
        solo
        append-icon="mdi-currency-inr"
        dense
        :error-messages="amountErrors"
        single-line
      />
    </v-flex>
    <v-spacer />
    <v-flex xs5>
      <v-select
        v-model="amount.unit"
        :items="unitList"
        label="Unit"
        solo
        dense
        :error-messages="unitErrors"
        single-line
      />
    </v-flex>
    <v-spacer />
    <v-flex v-if="index === (total - 1)" xs1 class="py-1">
      <v-btn color="success" fab x-small @click="addProductPrice">
        <v-icon class="mx-0">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-flex>
    <v-flex v-else xs1 class="py-1">
      <v-btn color="error" fab x-small @click="deleteProductPrice">
        <v-icon class="mx-0">
          mdi-close
        </v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  required, numeric //, minLength, maxLength
} from 'vuelidate/lib/validators'

export default {
  props: {
    amount: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    units: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    amountErrors () {
      const errors = []
      if (!this.$v.amount.value.$dirty) { return errors }
      if (!this.$v.amount.value.required) { errors.push('Price is required.') }
      if (!this.$v.amount.value.numeric) { errors.push('should be number.') }
      return errors
    },
    unitErrors () {
      const errors = []
      if (!this.$v.amount.unit.$dirty) { return errors }
      if (!this.$v.amount.unit.required) { errors.push('Unit is required.') }
      return errors
    },
    unitList () {
      return this.$globals.units()
    }
  },
  methods: {
    addProductPrice () {
      this.$v.amount.$touch()
      if (this.$v.amount.$invalid) { return false }
      this.$emit('update-product-price', { action: 'add' })
    },
    deleteProductPrice () {
      this.$emit('update-product-price', { action: 'delete', index: this.index })
    }
  },
  validations: {
    amount: {
      unit: {
        required
      },
      value: {
        required,
        numeric
      }
    }
  }
}
</script>
