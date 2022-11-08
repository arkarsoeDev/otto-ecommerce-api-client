import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/views/Layout/DefaultLayout.vue";
import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Layout/AuthLayout.vue";
import Home from "@/views/Front/Home.vue";
import Shop from "@/views/Front/Shop.vue";
import ProductView from "@/views/Front/ProductView.vue";
import CartView from "@/views/Front/CartView.vue";
import Checkout from '@/views/Front/Checkout.vue';
import Summary from "@/views/Front/Summary.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard/Dashboard.vue";
import { useUserStore } from "../stores/user";
import { useAppStore } from "../stores/app";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "DefaultLayout",
            component: DefaultLayout,
            children: [
                {
                    path: "/",
                    name: "Home",
                    component: Home,
                },
                {
                    path: "/shop",
                    name: "Shop",
                    component: Shop,
                },
                {
                    path: "/shop/:slug",
                    props: true,
                    name: "ProductView",
                    component: ProductView,
                },
                {
                    path: "/cart",
                    name: "CartView",
                    component: CartView,
                },
                {
                    path: "/checkout",
                    name: "Checkout",
                    component: Checkout,
                },
                {
                    path: "/summary",
                    name: "Summary",
                    component: Summary,
                },
            ],
        },
        {
            path: "/dashboard",
            name: "DashboardLayout",
            component: DashboardLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    component: Dashboard,
                },
            ],
        },
        {
            path: "/auth",
            redirect: "/login",
            name: "Auth",
            component: AuthLayout,
            meta: { isGuest: true },
            children: [
                {
                    path: "/login",
                    name: "Login",
                    component: Login,
                },
                {
                    path: "/register",
                    name: "Register",
                    component: Register,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const appStore = useAppStore();

    appStore.mobileNav = false;

    if (to.meta.requiresAuth && !userStore.user.token) {
        next({name: 'Login'})
    } else if(userStore.user.token && to.meta.isGuest) {
        next({name: 'Home'});
    } else {
        next();
    }
})

export default router;
