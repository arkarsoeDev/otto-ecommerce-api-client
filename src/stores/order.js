import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useOrderStore = defineStore("order", {
    state: () => ({}),
    actions: {
        fetchOrders({ url = null, search = "", per_page, page } = {}) {
            NProgress.start();
            url = url ?? "/orders";
            return getAxiosClient()
                .get(url, {
                    params: {
                        search,
                        per_page,
                        page,
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
        fetchOrder(id) {
            NProgress.start();
            return getAxiosClient()
                .get(`/orders/${id}`)
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
    },
});
