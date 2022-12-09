import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";

export const useOrderStore = defineStore("order", {
    state: () => ({}),
    actions: {
        fetchOrders({ url = null, search = "", per_page, page } = {}) {
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
                    return data;
                });
        },
        fetchOrder(id) {
            return getAxiosClient()
                .get(`/orders/${id}`)
                .then(({ data }) => {
                    return data;
                })
        },
    },
});
