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
                    />
                    <v-text-field
                      v-model="model.password"
                      label="Password"
                      solo
                      type="password"
                      append-icon="mdi-lock"
                      dense
                      single-line
                    />
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-spacer />
                <v-flex class="py-0" xs6>
                  <v-btn color="success" class="rounded-xl" block dark @onclick="login">
                    Login
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
          Don't have an account? <a href="/signup" style="text-decoration: none;">Sign up</a>
        </v-list-item-title>
      </v-list-item>
    </v-footer>
  </v-app>
</template>

<script>
import _ from 'lodash'
import {
  required
} from 'vuelidate/lib/validators'

export default {
  layout: 'clean',
  data: () => ({
    model: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login () {
      this.$v.$touch()
      // eslint-disable-next-line
      console.log('i am gereregeeg')
      if (!this.$v.model.email.$invalid) {
        const [error] = await this.$api.login({
          email: this.model.email,
          password: this.model.password
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
    }
  },
  validations: {
    model: {
      email: {
        required
      },
      password: {
        required
      }
    }
  }
}
</script>
