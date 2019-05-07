import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    myProducts: [],
    quantity: 0,
    dragging: false,
  },

  getters: {
    /*
     * Get total account prize of products
     */
    getTotalAccount: state => state.myProducts.reduce((old, active) => {
      const oldValue = (typeof old === 'object') ? (old.quantity * old.Prize) : old;
      return oldValue + (active.quantity * active.Prize);
    }, 0),
  },

  mutations: {
    /*
     * Set product depending of json
     */
    SET_PRODUCTS(state, products) {
      state.products = [...products];
    },

    /*
     * Add a product in cart
     */
    ADD_PRODUCT_TO_MY_CART(state, product) {
      state.myProducts.push(product);
    },

    /*
     * Set my products
     */
    SET_MY_PRODUCTS(state, products) {
      state.myProducts = [...products];
    },

    /*
     * Change specific product quantity, depending of index and increment per 1
     */
    INCREMENT_QUANTITY_PRODUCT(state, index) {
      Vue.set(state.myProducts[index], 'quantity', state.myProducts[index].quantity + 1);
    },

    /*
     * Change specific product quantity, depending of index and value
     */
    CHANGE_QUANTITY_PRODUCT(state, { index, quantity }) {
      Vue.set(state.myProducts[index], 'quantity', quantity);
    },

    /*
     * Increment to quantity depending of value
     */
    PUSH_QUANTITY_PRODUCTS(state, payload) {
      state.quantity += payload.quantity;
    },

    /*
     * Subtract to quantity depending of value
     */
    SUBTRACT_QUANTITY(state, payload) {
      state.quantity -= payload.quantity;
    },

    /*
     * Delete product depeding of index
     */
    DELETE_PRODUCT(state, payload) {
      state.myProducts = [
        ...state.myProducts.slice(0, payload.index),
        ...state.myProducts.slice(payload.index + 1),
      ];
    },

    /*
     * Switch value of dragging
     */
    SWITCH_DRAGGING(state) {
      state.dragging = !state.dragging;
    },
  },

  actions: {
    /*
     * Add products to store and increment quantity, return my products
     */
    ADD_PRODUCT_TO_MY_CART(context, product) {
      return new Promise((resolve) => {
        const productIndex = context.state.myProducts.findIndex(myProduct => myProduct.ProductId === product.ProductId);
        let storeMyProducts = JSON.parse(localStorage.getItem('products'));

        if (productIndex > -1) {
          context.commit('INCREMENT_QUANTITY_PRODUCT', productIndex);

          storeMyProducts[productIndex][1] += 1;
          localStorage.setItem('products', JSON.stringify(storeMyProducts));
        } else {
          context.commit('ADD_PRODUCT_TO_MY_CART', { ...product, quantity: 1 });

          
          storeMyProducts.push([product.ProductId, 1]);
          localStorage.setItem('products', JSON.stringify(storeMyProducts));
        }

        context.commit('PUSH_QUANTITY_PRODUCTS', { quantity: 1 });

        resolve(context.state.myProducts);
      });
    },

    /*
     * Delete product by index and subtract quantity
     */
    DELETE_PRODUCT(context, payload) {
      const { index } = payload;
      const { quantity } = context.state.myProducts[index];

      context.commit('SUBTRACT_QUANTITY', { quantity });
      context.commit('DELETE_PRODUCT', { index });

      // Update local storage
      let storeMyProducts = JSON.parse(localStorage.getItem('products'));
      
      storeMyProducts = [
        ...storeMyProducts.slice(0, index),
        ...storeMyProducts.slice(index + 1),
      ];

      localStorage.setItem('products', JSON.stringify(storeMyProducts));
    },

    /*
     * Update quantity of specific product, depending of index and change general quantity
     */
    UPDATE_QUANTITY_PRODUCT(context, { index, quantity }) {
      const oldQuantity = context.state.myProducts[index].quantity;
      const subtractQuantity = (quantity - oldQuantity);
      let storeMyProducts = JSON.parse(localStorage.getItem('products'));

      if (subtractQuantity < 0) {
        context.commit('SUBTRACT_QUANTITY', { quantity: Math.abs(subtractQuantity) });
      } else if (subtractQuantity > 0) {
        context.commit('PUSH_QUANTITY_PRODUCTS', { quantity: subtractQuantity });
      }

      // Update local storage | REFACTOR 
      storeMyProducts[index][1] = quantity;
      localStorage.setItem('products', JSON.stringify(storeMyProducts));
      
      context.commit('CHANGE_QUANTITY_PRODUCT', { index, quantity });
    },

    /*
     *
     */
    GET_MY_PRODUCTS(context) {
      import('@/json/product.json')
        .then(({ default: products }) => {
          context.commit('SET_PRODUCTS', products);

          // Update local storage | REFACTOR, add in only a function
          let storeMyProducts = JSON.parse(localStorage.getItem('products'));
          
          if (storeMyProducts) {
            if (storeMyProducts.length) {
              let totalQuantity = 0;
              let myProducts = storeMyProducts.reduce((old, active) => {
                let [id, quantity] = active;
                let [product] = context.state.products.filter((product) => product.ProductId === id);
                
                totalQuantity += quantity;
                old.push({ ...product, quantity });

                return old;
              }, []);

              context.commit('PUSH_QUANTITY_PRODUCTS', { quantity: totalQuantity });
              context.commit('SET_MY_PRODUCTS', myProducts);
            }
          } else {
            localStorage.setItem('products', JSON.stringify([]));
          }
        });
    }
    
  },
});