import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

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
            NProgress.start();
            return getAxiosClient()
                .get("/categories")
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        fetchProducts({ url = null, search, category, sort, paginate='true', count=null } = {}) {
            NProgress.start();
            url = url ?? "/products";
            return getAxiosClient()
                .get(url, {
                    params: {
                        search,
                        category,
                        sort,
                        paginate,
                        count,
                    },
                })
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        fetchProduct(slug) {
            NProgress.start();
            return getAxiosClient()
                .get("/products/" + slug)
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        checkout(payload) {
            return getAxiosClient()
                .post("/checkout", payload)
                .then(({ data }) => {
                    return data;
                })
                .catch((error) => {
                    throw error;
                });
        },
        payment(payload) {
            return getAxiosClient()
                .post("/payment", payload)
                .then(({ data }) => {
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        setActiveCategory(category) {
            this.activeCategory = category;
        },
        setActiveSort(sort) {
            this.activeSort = sort;
        },
        setPaymentData(payload) {
            this.paymentData = payload;
        },
        setPaymentMessage(payload) {
            this.paymentMessage = payload;
        },
    },
});
