<template>
    <div class="total__container">
        Subtotal ({{quantity}} {{(quantity > 1) ? 'productos' : 'producto'}}) <span class="quantity--text">${{getTotalAccount | format-money}}</span>
    </div>
</template>


<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['quantity']),
    /*
     * Get total account by products prize
     */
    getTotalAccount() {
      return this.$store.getters.getTotalAccount;
    },
  },
};
</script>

<style lang="scss">
    .total {
        &__container {
            margin-top: 1em;
            text-align: right;
            padding: 1.5em 1em;
            border-top: 1px solid #4242429e;
        }
    }
</style>
