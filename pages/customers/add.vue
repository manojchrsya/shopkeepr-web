<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/customers/list'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="!id">
            Add New Customer
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Edit Customer
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12>
            <v-text-field
              v-model="name"
              label="Name"
              solo
              append-icon="mdi-account"
              dense
              single-line
              :error-messages="nameErrors"
            />
          </v-flex>
          <v-flex class="py-0" xs12>
            <v-text-field
              v-model="mobile"
              single-line
              dense
              append-icon="mdi-cellphone-basic"
              label="Mobile number"
              solo
              :error-messages="mobileErrors"
            />
          </v-flex>
          <v-spacer />
          <v-flex class="py-0" xs12>
            <v-textarea
              v-model="description"
              placeholder="Other information"
              append-icon="mdi-information"
              single-line
              dense
              solo
            />
          </v-flex>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark @click="save">
              Save Details
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import {
  required, numeric, minLength, maxLength
} from 'vuelidate/lib/validators'
// eslint-disable-next-line no-useless-escape
const mobileRegex = /^[6789]\d{9}$/

export default {
  async asyncData ({ app, route }) {
    if (route && route.query && route.query.id) {
      const customerId = route.query.id
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await app.$api.get(`Customers/${customerId}`)
      if (!error) {
        return {
          id: response.data.id,
          name: response.data.name,
          mobile: response.data.mobile,
          description: response.data.description
        }
      }
    }
  },
  data: () => ({
    id: '',
    name: '',
    mobile: '',
    description: ''
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      if (!this.$v.name.required) { errors.push('Name is required.') }
      return errors
    },
    mobileErrors () {
      const errors = []
      if (!this.$v.mobile.$dirty) { return errors }
      if (!this.$v.mobile.isValidMobileNumber) { errors.push('Invalid Mobile.') }
      return errors
    }
  },
  methods: {
    async save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const formData = {
          name: this.name,
          mobile: this.mobile,
          description: this.description
        }
        let customerPromise = ''
        if (this.id) {
          customerPromise = this.$api.patch(`Customers/${this.id}`, formData)
        } else {
          customerPromise = this.$api.post('Customers', formData)
        }
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await customerPromise
        if (!error && response) {
          this.$globals.showSuccessMessage('Customer saved successfully!!!')
          this.id = response.data.id
        } else {
          const errorMessage = _.has(error.response.data, 'error.message') ? error.response.data.error.message : ''
          this.$globals.showErrorMessage(errorMessage)
        }
      }
    }
  },
  validations: {
    name: {
      required
    },
    mobile: {
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10),
      isValidMobileNumber (value) {
        return value ? mobileRegex.test(value) : true
      }
    }
  }
}
</script>
