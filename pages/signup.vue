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
                      label="Business Name"
                      solo
                      append-icon="mdi-briefcase"
                      dense
                      single-line
                    />
                    <v-text-field
                      label="Full Name"
                      solo
                      append-icon="mdi-account"
                      dense
                      single-line
                    />
                    <v-text-field
                      label="Email"
                      solo
                      append-icon="mdi-email"
                      dense
                      single-line
                    />
                    <v-text-field
                      label="Mobile"
                      solo
                      append-icon="mdi-phone"
                      dense
                      single-line
                    />
                    <v-text-field
                      label="Password"
                      type="password"
                      solo
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
                  <v-btn color="success" class="rounded-xl" block dark>
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

export default {
  layout: 'clean',
  auth: 'guest',
  data: () => ({
    paymentOptions: ['Credit', 'Debit']
  })
}
</script>
