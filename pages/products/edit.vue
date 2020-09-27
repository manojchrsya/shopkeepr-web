<template>
  <v-layout row wrap align-center>
    <v-flex>
      <v-card class="mx-auto px-0">
        <v-toolbar color="cyan">
          <v-btn icon :to="'/products'">
            <v-icon color="black lighten-1">
              mdi-close
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="!id">
            Add New Product
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Edit Product
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-flex xs12>
            <v-text-field
              v-model="title"
              label="Product Title"
              solo
              append-icon="mdi-chart-box"
              dense
              single-line
              :error-messages="titleErrors"
            />
          </v-flex>
          <v-flex class="py-0" xs12>
            <v-textarea
              v-model="description"
              rows="3"
              placeholder="Product details"
              append-icon="mdi-information"
              single-line
              dense
              solo
            />
          </v-flex>
        </v-card-text>
        <v-divider />
        <v-card-text class="pb-0">
          <v-layout v-for="(amount, index) in price" :key="index">
            <Price
              :amount="amount"
              :index="index"
              :total="price.length"
              @update-product-price="updateProductPrice"
            />
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-text class="pb-0">
          <v-layout>
            <v-flex class="py-0" xs5>
              <v-select
                v-model="unit"
                :items="usedUnits"
                dense
                label="Default Unit"
                solo
                :error-messages="unitErrors"
              />
            </v-flex>
            <v-spacer />
            <v-flex class="py-0" xs5>
              <v-select
                v-model="status"
                :items="statusList"
                dense
                label="Status"
                solo
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="success" block dark @click="save">
              Save Details
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-container v-if="images.length > 0" fluid>
          <v-row dense>
            <v-col v-for="(image, index) in images" :key="image.id" cols="6">
              <ProductImage :image="image" :index="index" @delete-product-image="deleteProductImage" />
            </v-col>
          </v-row>
        </v-container>
        <v-list v-else>
          <v-list-item>
            <v-list-item-title class="text-center">No Uploaded Image.</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-card-actions class="pt-0">
          <v-flex class="py-0" xs12>
            <v-btn color="primary" :loading="isUploading" :disabled="!id" block @click="openFileDialog">
              Upload Photos
            </v-btn>
            <input ref="file" type="file" @change="uploadFile()">
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import {
  required // numeric, minLength, maxLength
} from 'vuelidate/lib/validators'
import Price from '@/components/product/prices'
import ProductImage from '@/components/product/image'

export default {
  components: {
    Price,
    ProductImage
  },
  async asyncData ({ app, route }) {
    let result = {}
    if (route && route.query && route.query.id) {
      const productId = route.query.id
      // eslint-disable-next-line no-unused-vars
      const [error, response] = await app.$api.get(`Products/${productId}`, {
        params: { filter: { include: 'images' } }
      })
      if (!error) {
        result = response.data
      }
    }
    return { ...result }
  },
  data: () => ({
    id: '',
    title: '',
    description: '',
    price: [{ value: 0, unit: 'UNT' }],
    unit: '',
    status: 'ACTIVE',
    images: [],
    isUploading: false,
    statusList: ['ACTIVE', 'INACTIVE']
  }),
  computed: {
    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) { return errors }
      if (!this.$v.title.required) { errors.push('Name is required.') }
      return errors
    },
    unitErrors () {
      const errors = []
      if (!this.$v.unit.$dirty) { return errors }
      if (!this.$v.unit.required) { errors.push('Unit is required.') }
      return errors
    },
    unitList () {
      return this.$globals.units()
    },
    usedUnits () {
      return _.map(this.price, 'unit')
    }
  },
  methods: {
    updateProductPrice (options = {}) {
      const { action, index } = options
      this.price = this.price || []
      if (action === 'add') {
        this.price.push({ unit: '', value: 0 })
      } else if (action === 'delete' && index >= 0) {
        this.price.splice(index, 1)
      }
    },
    openFileDialog () {
      this.$refs.file.click()
    },
    async deleteProductImage (options = {}) {
      const { index } = options
      const image = this.images[index]
      if (image) {
        const url = `Products/${this.id}/deleteProductImage`
        const formData = {
          imageId: image.id
        }
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await this.$api.post(url, formData)
        if (!error) {
          this.$globals.showSuccessMessage('Image deleted successfully.')
          this.images.splice(index, 1)
        }
      }
    },
    async uploadFile () {
      if (_.isNil(this.id)) {
        this.$globals.showErrorMessage('please save product details first')
        return false
      }
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      const url = `Products/${this.id}/uploadProductImage`
      this.isUploading = true
      const [error, response] = await this.$api.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response) {
        this.images = _.concat(this.images, response.data)
        this.$globals.showSuccessMessage('Image uploaded successfully.')
      }
      if (error) {
        this.$globals.showErrorMessage('Only image files can be uploaded.')
      }
      this.isUploading = false
    },
    async save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const formData = {
          title: this.title,
          description: this.description,
          price: this.price.filter(data => data.unit),
          unit: this.unit,
          status: this.status
        }
        let productPromise = ''
        if (this.id) {
          productPromise = this.$api.patch(`Products/${this.id}`, formData)
        } else {
          productPromise = this.$api.post('Products', formData)
        }
        // eslint-disable-next-line no-unused-vars
        const [error, response] = await productPromise
        if (!error && response) {
          this.$globals.showSuccessMessage('Product details saved successfully!!!')
          this.id = response.data.id
        } else {
          const errorMessage = _.has(error.response.data, 'error.message') ? error.response.data.error.message : ''
          this.$globals.showErrorMessage(errorMessage)
        }
      }
    }
  },
  validations: {
    title: {
      required
    },
    unit: {
      required
    }
  }
}
</script>
<style scoped>
  .custom {
    height: 40px;
    width: 40px;
    border:1px dotted #2196f3;
    border-radius:0 !important;
    margin-top: 0px;
    overflow: hidden;
  }
  .customBox {
    width: 40px;
    height: 40px;
    background-color: rgb(199, 199, 199);
  }
  input[type=file] {
    display: none;
  }
</style>
