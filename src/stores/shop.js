import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";

export const useShopStore = defineStore("shop", {
    state: () => ({
        products: {},
        activeCategory: null,
        activeSort: null,
        paymentData: null,
        paymentMessage: null,
    }),
    actions: {
        fetchCategories() {
            return getAxiosClient()
                .get("/categories")
                .then(({ data }) => {
                    return data;
                });
        },
        fetchProducts({
            url = null,
            category,
            sort,
        } = {}) {
            url = url ?? "/products";
            return getAxiosClient()
                .get(url, {
                    params: {
                        category,
                        sort,
                    },
                })
                .then(({ data }) => {
                    return data
                });
        },
        fetchProduct(slug) {
            return getAxiosClient()
                .get('/products/'+slug)
                .then(({ data }) => {
                    return data;
                })
                .catch(err => {
                    throw err
                })
                ;
        },
        checkout(payload) {
            return getAxiosClient()
                .post("/checkout", payload)
                .then(({ data }) => {
                    return data;
                });
        },
        payment(payload) {
            return getAxiosClient()
                .post("/payment", payload)
                .then(({ data }) => {
                    return data;
                })
                .catch(err => {
                    throw err
                })
                ;
        },
        setActiveCategory(category) {
            this.activeCategory = category;
        },
        setActiveSort(sort) {
            this.activeSort = sort;
        },
        setPaymentData(payload) {
            this.paymentData = payload
        },
        setPaymentMessage(payload) {
            this.paymentMessage = payload
        }
    },
});
