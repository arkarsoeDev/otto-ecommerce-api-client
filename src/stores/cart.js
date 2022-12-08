import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: sessionStorage.getItem("CART")
            ? JSON.parse(sessionStorage.getItem("CART"))
            : { items: [] },
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
                this.setCart();
            } else {
                this.cart.items.push(product);
                this.setCart();
            }
        },
        removeFromCart(index) {
            this.cart.items.splice(index, 1);
            this.setCart();
        },
        removeOneFromCart(index) {
            if (this.cart.items[index].quantity > 1) {
                this.cart.items[index].quantity--;
                this.setCart();
            }
        },
        clearCart() {
            this.cart.items = [];
            sessionStorage.removeItem("CART");
        },
        setCart() {
            sessionStorage.setItem("CART", JSON.stringify(this.cart));
        },
    },
    getters: {
        getCartQuantity(state) {
            return state.cart.items.reduce(
                (acc, item) => acc + item.quantity,
                0
            );
        },
        getCartTotal(state) {
            return state.cart.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
        },
    },
});
