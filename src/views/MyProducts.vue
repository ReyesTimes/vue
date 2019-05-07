<template>
    <main class="container myProducts__section">
        <div v-if="myProducts.length">
            <MyProductsList :products="myProducts"/>
            <TotalPrize />
        </div>
        <NotProducts v-if="!myProducts.length" />
    </main>
</template>

<script>
import NotProducts from '@/components/cart/NotProducts.vue';
import MyProductsList from '@/components/cart/MyProductsList.vue';
import TotalPrize from '@/components/cart/TotalPrize.vue';
import { mapState } from 'vuex';
export default {
  components: {
    NotProducts,
    MyProductsList,
    TotalPrize,
  },
  computed: {
    ...mapState(['myProducts']),
  },
};
</script>

<style lang="scss">
    .myProducts__section {
        margin-top: 4em;
    }
</style>