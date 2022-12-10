import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        mobileNav: false,
        mobile: window.innerWidth < 425,
        message: {
            type: '',
            content: '',
        },
    }),
    actions: {
        toggleMobileNav() {
         this.mobileNav = !this.mobileNav
        },
        addMessage(message) {
            this.message = message
        }
    },
});
