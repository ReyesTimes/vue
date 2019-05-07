<template>
    <draggable class="products__container" :list="products" @start="move" @end="move" :options="options">
        <div v-for="(product, key) in products" :key="key" :data-el="key" class="products__el">
            <div class="products__el--img">
                <img :src="product.ImgMedia" :alt="product.ProductName" />
                <div class="products__el--quantity" v-if="getQuantityByProduct(product)">{{getQuantityByProduct(product)}}</div>
            </div>
            <div class="products__info">
                <div class="products__info--name">
                    <strong>{{product.ProductName}}</strong>
                </div>
                <div class="products__info--brand">
                    <span>{{product.ProductBrand}}</span>
                </div>
                <div class="products__info--prize">
                    <span>${{product.Prize | format-money}}</span>
                </div>
                <button class="products__info--buy" @click="buyProduct(product, key)">
                    <div>
                        <span>Comprar</span>
                        <span>+</span>
                    </div>
                </button>
            </div>
        </div>
        <div class="drag__container" v-if="dragging || moveTime.value">
            <p v-if="!moveTime.value">Arrastra aquí el producto que quieres agregar al carrito.</p>
            <div v-if="moveTime.value">Se ha agregado el producto <span class="quantity--text">{{moveTime.product.ProductName}}</span> al carrito.</div>
        </div>
    </draggable>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
let timeOut;
export default {
  data() {
    return {
      options: {
        group: false,
        sort: false,
        draggable: '.products__el',
      },
      moveTime: {
        value: false,
        product: {},
      },
    };
  },
  computed: {
    ...mapState(['products', 'dragging']),
  },
  components: {
    draggable,
  },
  watch: {
    /*
     * Change value moveTime when is true in 2500 miliseconds
     */
    moveTime(val) {
      if (val) {
        timeOut = setTimeout(() => {
          this.moveTime = { value: false, product: {} };
          clearTimeout(timeOut);
        }, 2500);
      }
    },
  },
  methods: {
    /*
     * Add product to cart
     */
    buyProduct(product) {
      this.$store.dispatch('ADD_PRODUCT_TO_MY_CART', product);
    },
    /*
     * Execute in start and end event, when is end event and
     * the mouse position is equal to dragging content element
     * add element to my products
     */
    move(evnt) {
      if (window.event) {
        const { offsetTop: containerTop } = document.querySelector('.drag__container');
        const windowTop = window.event.pageY;
        const index = evnt.item.dataset.el;
        if (windowTop > containerTop) {
          const product = this.$store.state.products[index];
          this.moveTime = { ...this.moveTime, value: true, product };
          this.buyProduct(product);
        }
      }
      this.$store.commit('SWITCH_DRAGGING');
    },
    /*
     * Return quantity depending if exist product in my products
     * REFACTOR, Change quantity to products collection
     */
    getQuantityByProduct(product) {
      const { myProducts } = this.$store.state;
      const [equalProduct] = myProducts.filter(myProduct => myProduct.ProductId === product.ProductId);
      return (equalProduct) ? equalProduct.quantity : 0;
    },
  },
};
</script>


<style lang="scss">
    .drag {
        &__container {
            position: fixed;
            bottom: 0;
            padding: 2.75em;
            background-color: white;
            width: 100%;
            border-top: 1px solid #e4e4e4;
            text-align: center;
            left: 0px;
        }
    }
    .products {
        &__container {
            display: flex;
            flex-wrap: wrap;
            margin-top: 4em;
        }
        &__el {
            margin-right: 2.5%;
            margin-bottom: 1em;
            position: relative;
            @media (min-width: 576px) {
                width: 100%;
                margin-right: 0px;
            }
            @media (min-width: 768px) {
                width: 48.5%;
                margin-right: 3%;
                &:nth-child(2n+0) {
                    margin-right: 0px;
                }
            }
            @media (min-width: 992px) {
                width: 32%;
                margin-right: 2%;
                &:nth-child(2n+0) {
                    margin-right: auto;
                }
                &:nth-child(3n+0) {
                    margin-right: 0px;
                }
            }
            @media (min-width: 1200px) {
                width: 23%;
                margin-right: 2.66%;
                &:nth-child(2n+0) {
                    margin-right: auto;
                }
                &:nth-child(3n+0) {
                    margin-right: auto;
                }
                &:nth-child(4n+0) {
                    margin-right: 0px;
                }
            }
            &--quantity {
                position: absolute;
                top: 5%;
                right: 3%;
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
            &:hover .products__info--buy {
                display: block;
            }
        }
        &__el--img {
            & > img {
                width: 100%;
                height: auto;
            }
        }
        &__info {
            padding: 0.75em 0.75em 1em 0;
            text-align: left;
            position: relative;
            &--name {
                margin-bottom: 0.25em;
                font-size: 1.25em;
            }
            &--brand {
                color: gray;
                margin-bottom: 1em;
                font-size: 0.85em;
            }
            &--prize {
                font-family: 'Oswald', sans-serif;
                & > span {
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        width: 107%;
                        height: 3px;
                        background-color: #ffcb28;
                        left: 0px;
                        bottom: 2px;
                    }
                }
            }
            &--buy {
                display: none;
                position: absolute;
                right: 0px;
                bottom: 10%;
                div {
                    position: relative;
                    background-color: #fff;
                    border: 2px solid #ffcb28;
                    letter-spacing: 1px;
                    font-family: 'Oswald', sans-serif;
                    padding: 0.5em 0.75em;
                    border-radius: 5px;
                    text-transform: uppercase;
                    overflow: hidden;
                }
                & span:first-child {
                    margin-right: 5px;
                }
                &:hover {
                    & > div:after {
                        transform: translateX(-80%);
                    }
                }
                & > div:after {
                    content: 'COMPRAR +';
                    width: 100%;
                    background-color: #ffcb28;
                    color: #231f20;
                    border: 2px solid #ffcb28;
                    padding: 0.5em 0.75em;
                    border-radius: 5px;
                    transform: translateX(-200%);
                    position: absolute;
                    top: -2px;
                    transition: all 0.2s ease-out;
                }
            }
        }
    }
</style>