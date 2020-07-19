export default function (ctx, inject) {
  class Api {
    // eslint-disable-next-line class-methods-use-this
    async call (promise) {
      try {
        const response = await promise
        return [null, response]
      } catch (error) {
        return [error, null]
      }
    }

    get (url, query = {}) {
      return this.call(ctx.app.$axios.get(url, query))
    }

    post (url, data = {}, headers = {}) {
      return this.call(ctx.app.$axios.post(url, data, headers))
    }

    patch (url, data = {}) {
      return this.call(ctx.app.$axios.patch(url, data))
    }

    put (url, data = {}) {
      return this.call(ctx.app.$axios.put(url, data))
    }

    delete (url, query = {}) {
      return this.call(ctx.app.$axios.delete(url, query))
    }

    login (data) {
      return this.call(ctx.app.$auth.loginWith('local', { data }))
    }
  }
  ctx.$api = new Api()
  inject('api', new Api())
}
