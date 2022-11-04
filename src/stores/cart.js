import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
      cart: {
          items: []
        },
        order: {},
    }),
    actions: {
        addToCart(product) {
            let productInCartIndex = this.cart.items.findIndex(
                (item) => item.slug === product.slug
            );
            if (!product.quantity) {
                product.quantity = 1;
            }
            if (productInCartIndex !== -1) {
                this.cart.items[productInCartIndex].quantity +=
                    product.quantity;
            } else {
                this.cart.items.push(product);
            }
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        updateOrder(order) {
            this.order = order;
        },
        clearCart() {
            this.cart = [];
        },
   },
   getters: {
      getCartQuantity(state) {
         return state.cart.items.reduce((acc,item) => acc + item.quantity,0)
      },
      getCartTotal(state) {
         return state.cart.items.reduce((acc,item) => acc + (item.price * item.quantity),0)
      }
    }
});
