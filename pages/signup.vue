<template>
  <v-app>
    <v-main>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <v-btn to="/login" class="ma-2" tile large icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-card class="mx-auto px-0" flat>
              <v-card-title class="headline mb-2 font-weight-bold">
                Create Account
              </v-card-title>
              <v-card-text>
                <v-layout>
                  <v-flex class="py-0">
                    <v-text-field
                      v-model="business"
                      label="Business Name"
                      solo
                      append-icon="mdi-briefcase"
                      dense
                      single-line
                      :error-messages="businessErrors"
                    />
                    <v-text-field
                      v-model="name"
                      label="Full Name"
                      solo
                      append-icon="mdi-account"
                      dense
                      single-line
                      :error-messages="nameErrors"
                    />
                    <v-text-field
                      v-model="email"
                      label="Email"
                      solo
                      append-icon="mdi-email"
                      dense
                      single-line
                      :error-messages="emailErrors"
                    />
                    <v-text-field
                      v-model="mobile"
                      label="Mobile"
                      solo
                      append-icon="mdi-phone"
                      dense
                      single-line
                      :error-messages="mobileErrors"
                    />
                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      solo
                      append-icon="mdi-lock"
                      dense
                      single-line
                      :error-messages="passwordErrors"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer />
                <v-flex class="py-0" xs6>
                  <v-btn color="success" class="rounded-xl" block dark @click="register">
                    Sign Up
                    <v-icon right dark>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer>
      <v-list-item>
        <v-list-item-title class="text-center">
          Already have an account? <a href="/login" style="text-decoration: none;">Sign in</a>
        </v-list-item-title>
      </v-list-item>
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'
import {
  // eslint-disable-next-line no-unused-vars
  required, email, numeric, minLength, maxLength
} from 'vuelidate/lib/validators'
// eslint-disable-next-line no-useless-escape
const mobileRegex = /^[6789]\d{9}$/

export default {
  layout: 'clean',
  auth: 'guest',
  data: () => ({
    business: '',
    name: '',
    email: '',
    mobile: '',
    password: ''
  }),
  computed: {
    businessErrors () {
      const errors = []
      if (!this.$v.business.$dirty) { return errors }
      if (!this.$v.business.required) { errors.push('This field is required') }
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      if (!this.$v.name.required) { errors.push('This field is required') }
      return errors
    },
    mobileErrors () {
      const errors = []
      if (!this.$v.mobile.$dirty) { return errors }
      if (!this.$v.mobile.required) { errors.push('This field is required') }
      if (!this.$v.mobile.isValidMobileNumber) { errors.push('Invalid Mobile.') }
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      if (!this.$v.email.required) { errors.push('This field is required') }
      if (!this.$v.email.email) { errors.push('Invalid Email.') }
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      if (!this.$v.mobile.required) { errors.push('This field is required') }
      return errors
    }
  },
  methods: {
    async register () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const formData = {
          business: this.business,
          name: this.name,
          email: this.email,
          mobile: this.mobile,
          password: this.password
        }
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await this.$api.post('SkUsers/register', formData)
        window.getApp.$emit('SHOW_SUCCESS_MESSAGE', {
          message: 'Woot!! registration successfull. wait for moment...'
        })
        setTimeout(async () => {
          if (!error) {
            const [error] = await this.$api.login({
              email: this.email,
              password: this.password
            })
            if (!error) {
              const { roles } = this.$auth.$state.user
              if (roles && _.first(roles) && _.first(roles).defaultRoute) {
                window.location.href = _.first(roles).defaultRoute
              } else {
                window.location.href = '/dashboard'
              }
            }
          }
        }, 3000)
      }
    }
  },
  validations: {
    business: {
      required
    },
    name: {
      required
    },
    email: {
      required,
      email
    },
    mobile: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10),
      isValidMobileNumber (value) {
        return value ? mobileRegex.test(value) : true
      }
    },
    password: {
      required
    }
  }
}
</script>
