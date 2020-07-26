<template>
  <v-app>
    <v-main>
      <v-container class="py-0">
        <nuxt />
      </v-container>
      <v-snackbar
        v-model="snackbar.show"
        :timeout="3000"
        top
        centered
        :color="snackbar.color"
      >
        <p class="text-center mb-0">
          {{ snackbar.text }}
        </p>
        <template v-slot:action="{ attrs }">
          <v-btn
            text
            v-bind="attrs"
            @click="snackbar.show = false"
          >
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import AppEvents from '@/util/event'

export default {
  data: () => ({
    snackbar: {
      show: false,
      text: '',
      color: ''
    }
  }),
  created () {
    AppEvents.forEach((item) => {
      this.$on(item.name, item.callback)
    })
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.getApp = this
  }
}
</script>
