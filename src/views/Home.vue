<template>
  <main class="container">
    <Products />
  </main>
</template>

<script>
import Products from '@/components/home/Products.vue';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      products: [],
    };
  },
  computed: {
    ...mapState(['dragging']),
  },
  components: {
    Products,
  },
};
</script>