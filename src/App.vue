
<template>
  <div id="app">
    <HeaderComponent />
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/Header.vue';
export default {
  components: {
    HeaderComponent,
  },
  mounted() {
    this.$store.dispatch('GET_MY_PRODUCTS')
  },
};
</script>