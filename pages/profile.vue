<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-toolbar-title>My Profile</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row align="center">
            <v-col align="center" class="pb-0" cols="12">
              <v-badge
                avatar
                bordered
                overlap
                icon="mdi-pencil"
              >
                <v-avatar color="teal" size="62">
                  <v-img
                    size="60"
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  />
                </v-avatar>
              </v-badge>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto px-0">
        <v-list subheader>
          <v-subheader>
            <strong>Business Details</strong>
            <v-spacer />
            <v-btn icon :href="textMessage">
              <v-icon color="black lighten-1">
                mdi-share-outline
              </v-icon>
            </v-btn>
          </v-subheader>
          <v-divider />
          <v-list-item
            v-for="(value, key) in business"
            :key="key"
            height="5"
          >
            <v-list-item-content class="py-0">
              <v-list-item-subtitle v-text="key" />
              <v-list-item-subtitle v-text="value" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list subheader>
          <v-subheader><strong>Customer Details</strong></v-subheader>
          <v-divider />
          <v-list-item
            v-for="(value, key) in customer"
            :key="key"
            height="5"
          >
            <v-list-item-content class="py-0">
              <v-list-item-subtitle v-text="key" />
              <v-list-item-subtitle v-text="value" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list subheader>
          <v-subheader>
            <strong>Logout</strong>
            <v-spacer />
            <v-btn icon @click="$auth.logout()">
              <v-icon color="black lighten-1">
                mdi-logout
              </v-icon>
            </v-btn>
          </v-subheader>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const _ = require('lodash')

export default {
  computed: {
    business () {
      const details = _.first(this.$auth.state.shop) || {}
      return {
        Name: details.displayName,
        Mobile: details.mobile,
        'Tag Line': details.tagLine || '-',
        'Short URL': details.url || '-'
      }
    },
    customer () {
      const details = this.$auth.user
      return {
        Name: details.name,
        Mobile: details.mobile,
        Email: details.email
      }
    },
    textMessage () {
      const details = _.first(this.$auth.state.shop) || {}
      if (details.sms && details.sms.share) {
        return `sms:?&body=${details.sms.share}`
      }
      return ''
    }
  }
}
</script>
