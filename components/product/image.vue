<template>
  <v-card>
    <v-img
      :src="image.url"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title class="py-0 px-0">
        <v-flex class="py-0" xs12>
          <v-btn color="error" block dark @click="deleteProductImage">
            Delete
          </v-btn>
        </v-flex>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    deleteProductImage () {
      this.$emit('delete-product-image', { action: 'delete', index: this.index })
    }
  }
}
</script>
