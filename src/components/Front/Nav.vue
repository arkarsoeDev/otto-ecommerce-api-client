<template>
   <section :class="{ 'hero bg-blue-100 h-screen bg-[url(../assets/img/slide2.jpg)] bg-no-repeat bg-cover bg-[60%_top]': route.name === 'Home', 'bg-slate-800 text-white' : route.name !== 'Home'}">
      <!-- mobile nav -->
      <div class="mobile-nav fixed top-0 transition-transform py-8 px-4 w-2/3 bg-black h-screen z-20 md:w-2/6 lg:hidden"
         :class="{ '-translate-x-full': !appStore.mobileNav, 'translate-x-0': appStore.mobileNav }">
         <nav>
            <div id="navClose" class="absolute top-8 right-3 text-white" @click="toggleMobileNav">
               <XMarkIcon class="block h-6 w-6" aria-hidden="true" />
            </div>
            <div><span class="text-lg text-white">Otto</span></div>

            <ul class="mt-6 text-white">
               <li>
                  <NavItem class="p-3" :isActive="route.name === 'Home' ? true : false" urlPath="Home">Home</NavItem>
               </li>
               <li>
                  <NavItem class="block p-3 transition-colors hover:text-black hover:bg-white"
                     :isActive="route.name === 'Shop' ? true : false" urlPath="Shop">Shop</NavItem>
               </li>
               <template v-if="!userStore.user.token &&  appStore.mobile">
                     <li>
                        <NavItem class="block p-3 transition-colors hover:text-black hover:bg-white"
                           :isActive="route.name === 'Login' ? true : false" urlPath="Login">Login</NavItem>
                     </li>
                     <li>
                        <NavItem class="block p-3 transition-colors hover:text-black hover:bg-white"
                           :isActive="route.name === 'Register' ? true : false" urlPath="Register">Register</NavItem>
                     </li>
               </template>
            </ul>
         </nav>
      </div>
      <!-- end mobile nav -->
      <div class="container mx-auto">
         <nav>
            <div class="flex items-center py-8 px-8 w-full lg:px-24">
               <div class="inline-block lg:mr-32">
                  <span class="text-lg">Otto</span>
               </div>
               <ul class="hidden lg:flex items-center">
                  <li>
                     <NavItem class="mr-3" :isActive="route.name === 'Home' ? true : false" urlPath="Home">Home</NavItem>
                  </li>
                  <li>
                     <NavItem class="mr-3" :isActive="route.name === 'Shop' ? true : false" urlPath="Shop">Shop</NavItem>
                  </li>
               </ul>
               <div class="ml-auto flex items-center">
                  <template v-if="!userStore.user.token && !appStore.mobile">
                     <div class="ml-auto mr-3 bg-slate-300 p-1 shadow-md flex items-center">
                        <NavItem class="text-slate-900 underline-offset-4 hover:underline" urlPath="Login">Login</NavItem>
                        <NavItem class="text-slate-900 underline-offset-4 hover:underline" urlPath="Register">Register</NavItem>
                     </div>
                  </template>
                  <div class="ml-auto bg-slate-300 p-3 shadow-md">
                     <ul class="flex items-center">
                        <template v-if="userStore.user.token">
                           <li class="flex items-center">
                              <Profile></Profile>
                           </li>
                        </template>
                  
                        <li class="flex items-center">
                           <router-link :to="{name: 'CartView'}"
                              class="inline-block relative pr-3 mr-3 border-slate-900 border-r-2 lg:border-0 lg:mr-0 lg:pr-0">
                              <ShoppingBagIcon class="text-slate-900 w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true"></ShoppingBagIcon>
                              <div
                                 class="absolute border-gray-700 shadow flex items-center justify-center -top-3 left-4 px-1.5 bg-blue-500 text-white rounded-lg">
                                 <span v-if="cartQuantity > 0">{{ cartQuantity }}</span>
                              </div>
                           </router-link>
                        </li>
                        <li class="flex items-center">
                           <div href="" id="navToggle" class="inline-block lg:hidden" @click="toggleMobileNav">
                              <Bars3Icon class="w-5 h-5 lg:w-6 lg:h-6 text-slate-900"></Bars3Icon>
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>

         <div v-if="route.name === 'Home'" class="flex items-center px-8 h-[60vh] overflow-hidden lg:px-24">
            <div class="px-8 py-8 bg-white bg-opacity-40">
               <h1 class="w-auto mb-5 text-4xl font-['Oswald'] font-bold uppercase sm:w-[26rem] lg:leading-[4rem] lg:text-5xl">
                  New Sale on Laptop Up to 30%
               </h1>
               <a href=""
                  class="inline-flex items-center p-3 border-2 border-black font-bold text-lg hover:bg-black hover:text-gray-100"><span
                     class="mr-3">Shop by Lacket</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-6 h-6 inline">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
               </a>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { XMarkIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import NavItem from '@/components/Front/Partial/NavItem.vue'
import Profile from '@/components/Front/Profile.vue'; 
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const appStore = useAppStore()
const cartStore = useCartStore()
const userStore = useUserStore()

const route = useRoute();

const toggleMobileNav = function () {
   appStore.toggleMobileNav();
}

const cartQuantity = computed(() => {
   return cartStore.getCartQuantity;
})

</script>