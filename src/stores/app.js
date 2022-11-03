import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        mobileNav: false,
        mobile: window.innerWidth < 425,
    }),
    actions: {
        toggleMobileNav() {
         this.mobileNav = !this.mobileNav
        },
    },
});
