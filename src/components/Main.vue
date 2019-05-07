<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap -mx-2">
      <div class="w-full md:w-1/3 px-3" v-for="(product, key) in products" :key="key">
        <div class="max-w-sm rounded overflow-hidden shadow-lg card">
          <div>
            <img :src="product.url_img" :alt="product.name" class="w-full" />
          </div>
          <div class="px-6 pt-4 pb-6 text-left align-center">
            <div class="font-bold text-2xl mb-6">{{ product.name }}</div>
            <div class="flex justify-between">
              <div class="text-red-border text-xl">${{ product.prize | format-money }}</div>
              <button class="btn bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Main',
  props: {
    msg: String
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    buyProduct(product) {
      this.$store.dispatch('BUY_PRODUCT', product)
      .then(() => {
      })
    }
  },
  created() {
    import('@/json/products.json')
    .then(({ default: products }) => {
      this.$store.commit('SET_PRODUCTS', products)
    })
  }
}
</script>

<style lang="scss">
  .card {
    &:hover {
      .btn {
        display: block;
      }
    }

    .btn {
      display: none;
    }
  }
</style>
