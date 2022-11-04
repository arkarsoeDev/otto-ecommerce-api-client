import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";

export const useShopStore = defineStore("shop", {
    state: () => ({
        products: {},
        activeCategory: null,
        activeSort: null,
    }),
    actions: {
        fetchCategories() {
            return getAxiosClient()
                .get("/api/v1/categories")
                .then(({ data }) => {
                    return data;
                });
        },
        fetchProducts(url, params) {
            if (params) {
                return getAxiosClient()
                    .get(url, params)
                    .then(({ data }) => {
                        console.log(data);
                        return data;
                    });
            } else {
                return getAxiosClient()
                    .get(url)
                    .then(({ data }) => {
                        return data;
                    });
            }
        },
        fetchProduct(url, slug) {
            return getAxiosClient()
                .get(url+`/${slug}`)
                .then(({ data }) => {
                    return data;
                });
        },
        setActiveCategory(category) {
            this.activeCategory = category;
        },
        setActiveSort(sort) {
            this.activeSort = sort;
        },
    },
});
