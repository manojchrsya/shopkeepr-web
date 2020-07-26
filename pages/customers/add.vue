<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon href="/customers/list">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title>Add New Customer</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12>
            <v-text-field
              label="Name"
              solo
              append-icon="mdi-account"
              dense
              single-line
            />
          </v-flex>
          <v-flex class="py-0" xs12>
            <v-text-field
              single-line
              dense
              append-icon="mdi-cellphone-basic"
              label="Mobile number"
              solo
            />
          </v-flex>
          <v-spacer />
          <v-flex class="py-0" xs12>
            <v-textarea
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
            <v-btn color="success" block dark>
              Save Details
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
