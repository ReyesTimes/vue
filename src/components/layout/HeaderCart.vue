<template>
    <router-link class="cart__container" :to="{ name: 'myProducts' }">
        <span
            class="cart__container--number"
            v-if="renderNumberMyProduct"
        >
            {{renderNumberMyProduct}}
        </span>
        <img src="@/assets/img/cart.svg" class="cart__container--icon" />
        <span>
            Carrito
        </span>
    </router-link >
</template>

<script>
export default {
  computed: {
    /*
     * Render number of my products
     */
    renderNumberMyProduct() {
      if (this.$store.state.quantity) {
        return this.$store.state.quantity;
      }
      return '';
    },
  },
};
</script>

<style lang="scss">
    .cart__container {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #231f20;
        &--number {
            margin-right: 5px;
            background-color: #ffcb28;
            border-radius: 100%;
            display: flex;
            align-items: center;
            height: 23px;
            width: 23px;
            justify-content: center;
            font-size: 0.75em;
        }
        &--icon {
            margin-right: 5px;
            margin-top: -2px;
        }
    }
</style>