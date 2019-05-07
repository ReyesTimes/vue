<template>
    <header class="header">
        <nav class="container">
            <ul class="header__list">
                <li class="header__list--el">
                    <router-link :to="{ name: 'home' }">
                        Inicio
                    </router-link>
                </li>
                <li class="header__list--el">
                    <HeaderCart />
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import HeaderCart from '@/components/layout/HeaderCart.vue';
export default {
  components: {
    HeaderCart,
  },
};
</script>

<style lang="scss">
    .header {
        position: fixed;
        top: 0px;
        width: 100%;
        background-color: #fff;
        padding: 0.65em 0.5em;
        z-index: 5;
        border-bottom: 1px solid rgb(228, 228, 228);
        &__list {
            list-style: none;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            &--el {
                padding: 0px 15px;
                border-right: 2px solid #ffcb28;
                &:last-child {
                    border-right: none;
                }
                & a {
                    text-decoration: none;
                    color: #231f20;
                }
            }
        }
    }
</style>