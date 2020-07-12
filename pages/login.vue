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
                      label="Email"
                      solo
                      append-icon="mdi-email"
                      dense
                      single-line
                    />
                    <v-text-field
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
                  <v-btn color="success" class="rounded-xl" block dark>
                    Login
                    <v-icon right dark>mdi-arrow-right</v-icon>
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

export default {
  layout: 'clean',
  data: () => ({
    paymentOptions: ['Credit', 'Debit']
  })
}
</script>
