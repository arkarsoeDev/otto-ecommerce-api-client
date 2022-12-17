import { defineStore } from "pinia";
import { getAxiosClient } from "../data/axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            data: JSON.parse(sessionStorage.getItem("USER")),
            token: sessionStorage.getItem("TOKEN"),
            billing_detail: {
                name: "arkar",
                email: "a@clone.com",
                phone: "000",
                address: "California",
                state: "California",
                postal_code: "442",
                city: "Cali",
            },
        },
    }),
    actions: {
        register(user) {
            NProgress.start();
            return getAxiosClient(this.user.token)
                .post("/register", user)
                .then(({ data }) => {
                    this.setToken(data.token);
                    this.setUserData(data.data);
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        login(user) {
            NProgress.start();
            return getAxiosClient(this.user.token)
                .post("/login", user)
                .then(({ data }) => {
                    this.setToken(data.token);
                    this.setUserData(data.data);
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        logout() {
            NProgress.start();
            return getAxiosClient(this.user.token)
                .post("/logout")
                .then(({ data }) => {
                    (this.user.data = {}), (this.user.token = null);
                    sessionStorage.removeItem("TOKEN");
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        updateProfileInfo(payload, id) {
            NProgress.start();
            return getAxiosClient()
                .put(`/profile/${id}`, new URLSearchParams(payload).toString())
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        changePassword(payload, id) {
            NProgress.start();
            return getAxiosClient()
                .put(
                    `/profile/change-password/${id}`,
                    new URLSearchParams(payload).toString()
                )
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        updateBillingInfo(payload, id) {
            NProgress.start();
            return getAxiosClient()
                .put(`/profile/update-billing-info/${id}`, new URLSearchParams(payload).toString())
                .then(({ data }) => {
                    NProgress.done();
                    return data;
                })
                .catch((error) => {
                    NProgress.done();
                    throw error;
                });
        },
        setToken(token) {
            this.user.token = token;
            sessionStorage.setItem("TOKEN", token);
        },
        setUserData(data) {
            this.user.data = data;
            sessionStorage.setItem("USER", JSON.stringify(data));
        },
        setBillingDetails(payload) {
            this.billing_detail = payload;
        },
    },
});
