<template>
    <div role="table" aria-label="Mis Productos">
        <div role="rowgroup">
            <div role="row" class="row__head">
                <span role="cell" class="cell__prize--head cell">Precio</span>
                <span role="cell" class="cell__quantity cell">Cantidad</span>
            </div>
        </div>
        <div role="rowgroup">
            <div role="row" class="row__body" v-for="(product, key) in products" :key="key">
                <span role="cell" class="cell__img cell">
                    <img :src="product.ImgMedia" :alt="product.ProductName" />
                </span>
                <span role="cell" class="cell__name cell">
                    {{product.ProductName}}

                    <a href="#" @click.prevent="deleteProduct(key)" class="cell__name--link">
                        Eliminar
                    </a>
                </span>
                <span role="cell" class="cell__prize cell">
                    <span class="quantity--text">${{product.Prize | format-money}}</span>
                </span>
                <span role="cell" class="cell__quantity cell">
                    <input 
                        type="number" 
                        v-model="myQuantities[key].quantity" 
                        min="1" 
                        @change="changeQuantity(myQuantities[key].quantity, key)" 
                        :title="`${product.name} quantity`"
                    />
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    // Duplicate products array in a new state, and not change the properties of state
    this.myQuantities = JSON.parse(JSON.stringify(this.products));
  },
  methods: {
    deleteProduct(index) {
      this.$store.dispatch('DELETE_PRODUCT', { index });
    },
    changeQuantity(value, index) {
      let quantity = Number.parseInt(value);
      this.$store.dispatch('UPDATE_QUANTITY_PRODUCT', { index, quantity });
    },
  },
};
</script>

<style lang="scss">
    .cell {
        padding: 0.5em;
        margin-bottom: 0.5em;
        &__img {
            width: 150px;
            padding: inherit;
            & img {
                width: 100%;
            }
        }
        &__name {
            width: 42%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            &--link {
                margin-top: 0.75em;
                font-size: 0.75em;
            }
        }
        &__prize {
            width: 26%;
            &--head {
                width: 24%;
            }
        }
        &__quantity {
            width: 16%;
            text-align: center;
            input {
                padding: 3px 2px;
                width: 35%;
                text-align: left;
            }
        }
    }
    .row {
        &__body {
            display: flex;
        }
        &__head {
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px solid #4242429e;
            margin-bottom: 1em;
        }
    }
</style>