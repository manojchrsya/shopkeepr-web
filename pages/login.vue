<template>
  <v-app>
    <v-main>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="mx-auto px-0" flat>
              <v-card-title class="headline mb-2 font-weight-bold">
                Login
              </v-card-title>
              <v-card-subtitle class="mb-5 h5 font-weight-bold">
                Please sign in to continue.
              </v-card-subtitle>
              <v-card-text>
                <v-layout>
                  <v-flex class="py-0">
                    <v-text-field
                      v-model="model.email"
                      label="Email"
                      solo
                      append-icon="mdi-email"
                      dense
                      single-line
                      :error-messages="emailErrors"
                    />
                    <v-text-field
                      v-model="model.password"
                      label="Password"
                      solo
                      type="password"
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
                  <v-btn color="success" class="rounded-xl" block dark @click="login({ anonymous: false })">
                    Login
                    <v-icon right dark>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-card>
            <v-card class="mx-auto px-0" flat>
              <v-row align="center">
                <v-divider /><span class="font-weight-bold">OR</span><v-divider />
              </v-row>
              <v-card-subtitle class="h5 font-weight-bold">
                Enter Shopkeeper Code directly.
              </v-card-subtitle>
              <v-card-text>
                <v-layout>
                  <v-flex class="py-0">
                    <v-text-field
                      v-model="model.code"
                      label="ShopKeeper Code"
                      solo
                      append-icon="mdi-arrow-right"
                      dense
                      single-line
                      :error-messages="codeErrors"
                      @click:append="login({ anonymous: true })"
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer>
      <v-list-item>
        <v-list-item-title class="text-center">
          Don't have an account? <a href="/signup" style="text-decoration: none;">Sign up</a>
        </v-list-item-title>
      </v-list-item>
    </v-footer>
  </v-app>
</template>

<script>
import {
  required, email
} from 'vuelidate/lib/validators'

export default {
  layout: 'clean',
  data: () => ({
    model: {
      email: '',
      password: '',
      code: ''
    },
    anonymous: false
  }),
  computed: {
    emailErrors () {
      const errors = []
      if (!this.anonymous) {
        if (!this.$v.model.email.$dirty) { return errors }
        if (!this.$v.model.email.required) { errors.push('Email is required.') }
        if (!this.$v.model.email.email) { errors.push('Invalid Email.') }
      }
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.anonymous) {
        if (!this.$v.model.password.$dirty) { return errors }
        if (!this.$v.model.password.required) { errors.push('Password is required.') }
      }
      return errors
    },
    codeErrors () {
      const errors = []
      if (this.anonymous) {
        if (!this.$v.model.code.$dirty) { return errors }
        if (!this.$v.model.code.required) { errors.push('Code is required.') }
      }
      return errors
    }
  },
  async created () {
    if (this.$route.query && this.$route.query.code) {
      this.model.code = this.$route.query.code
      await this.login({ anonymous: true })
    }
  },
  methods: {
    async login (options) {
      this.anonymous = options.anonymous || false
      this.$v.model.$touch()
      if (!this.$v.model.$invalid) {
        const request = {}
        if (this.anonymous) {
          request.code = this.model.code
        } else {
          request.email = this.model.email
          request.password = this.model.password
        }
        const [error] = await this.$api.login(request)
        if (!error) {
          window.location.href = '/'
        }
      }
    }
  },
  validations () {
    const validation = {
      model: {}
    }
    if (!this.anonymous) {
      validation.model.email = { required, email }
      validation.model.password = { required }
    } else {
      validation.model.code = { required }
    }
    return validation
  }
}
</script>
