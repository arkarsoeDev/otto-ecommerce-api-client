import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        mobileNav: false,
    }),
    actions: {
        toggleMobileNav() {
         this.mobileNav = !this.mobileNav
        },
    },
});
