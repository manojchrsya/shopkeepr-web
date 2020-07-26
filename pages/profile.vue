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
                <v-avatar color="orange" size="62">
                  <v-img
                    size="60"
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  />
                </v-avatar>
              </v-badge>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Mr. Manoj Chaurasiya</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto px-0">
        <v-list subheader>
          <v-subheader><strong>Business Details</strong></v-subheader>
          <v-divider />
          <v-list-item
            v-for="item in items"
            :key="item.title"
            height="5"
          >
            <v-list-item-content class="py-0">
              <v-list-item-subtitle v-text="item.title" />
              <v-list-item-subtitle v-text="item.data" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list subheader>
          <v-subheader><strong>Customer Details</strong></v-subheader>
          <v-divider />
          <v-list-item
            v-for="detail in customer"
            :key="detail.title"
            height="5"
          >
            <v-list-item-content class="py-0">
              <v-list-item-subtitle v-text="detail.title" />
              <v-list-item-subtitle v-text="detail.data" />
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

export default {
  data: () => ({
    paymentOptions: ['Credit', 'Debit'],
    items: [
      { title: 'Name', data: 'My New business' },
      { title: 'Mobile', data: '9987498273' },
      { title: 'GST Number', data: '1MHG2212121A121212' },
      { title: 'Pan Card', data: 'AKYPC4618C' }
    ],
    customer: [
      { title: 'Name', data: 'Manoj chaurasiya' },
      { title: 'Mobile', data: '9987498273' },
      { title: 'Email', data: 'manojchrsya@gmail.com' }
    ]
  })
}
</script>
