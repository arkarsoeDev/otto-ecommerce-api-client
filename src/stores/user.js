import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },
    }),
    actions: {
        register(user) {
            return getAxiosClient(this.user.token)
                .post("/api/v1/register", user)
                .then(({ data }) => {
                    this.setUser(data)
                    return data;
                });
        },
        login(user) {
            return getAxiosClient(this.user.token)
                .post("/api/v1/login", user)
                .then(({ data }) => {
                    this.setUser(data)
                    return data;
                })
        },
        logout() {
            return getAxiosClient(this.user.token)
                .post("/api/v1/logout")
                .then(({ data }) => {
                    this.user.data = {},
                    this.user.token = null
                    sessionStorage.removeItem("TOKEN")
                    return data;
                });
        },
        setUser(token) {
            this.user.token = token
            sessionStorage.setItem("TOKEN", token)
        }
    },
});
