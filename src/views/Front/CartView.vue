<template>
   <Breadcrumb>
      <BreadcrumbItem name="Cart" urlName="CartView">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>


   <template v-if="cartStore.cart.items.length > 0">
      <section>
         <div class="container mx-auto px-8 lg:px-24 mb-12">
            <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>
            <div>
               <div class="overflow-auto mb-6">
                  <table class="table broder overflow-hidden w-full">
                     <thead class="text-left whitespace-nowrap text-gray-700 uppercase bg-gray-100">
                        <tr>
                           <th class="py-3 px-6">Product</th>
                           <th class="py-3 px-6">Product Name</th>
                           <th class="py-3 px-6">Price</th>
                           <th class="py-3 px-6">Quantity</th>
                           <th class="py-3 px-6">Sub Total</th>
                           <th class="py-3 px-6">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="(item, index) in cartStore.cart.items" :key="index" class="bg-white border-b">
                           <td class="py-3 px-6"><img src="/img/cat_item01.jpg" class="min-w-[7rem] h-28" alt=""></td>
                           <td class="py-3 px-6"><span class="font-bold">{{ item.name }}</span></td>
                           <td class="py-3 px-6"><span class="font-semibold">{{ formatCurrency(item.price) }}</span>
                           </td>
                           <td class="py-3 px-6">
                              <div class="flex items-center">
                                 <div id="item-1"
                                    class="cart-qty flex items-center justify-center border-2 border-gray-300 w-12 h-12">
                                    {{ item.quantity }}
                                 </div>
                              </div>
                           </td>
                           <td class="py-3 px-6"><span class="font-semibold">{{ formatCurrency(item.price *
                                 item.quantity)
                           }}</span></td>
                           <td class="py-3 px-6 whitespace-nowrap">
                              <div>
                                 <router-link :to="{
                                 name: 'ProductView', params: {slug: item.slug}}"
                                    class="text-gray-100 bg-green-600 inline-block border border-transparent p-2 transition-colors hover:text-green-600 hover:bg-white hover:border-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                       class="w-5 h-5">
                                       <path
                                          d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                                    </svg>
                                 </router-link>
                                 <a href="" @click.prevent="cartStore.removeFromCart(index)"
                                    class="text-gray-100 bg-red-600 inline-block p-2 border border-transparent transition-colors hover:text-red-600 hover:bg-white hover:border-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                       class="w-5 h-5">
                                       <path fill-rule="evenodd"
                                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                          clip-rule="evenodd" />
                                    </svg>
                                 </a>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div class="flex flex-col sm:flex-row justify-end items-center">
                  <router-link :to="{ name: 'Shop' }"
                     class="p-3 mb-3 sm:mb-0 text-lg font-semibold bg-black text-white transition-colors border border-transparent sm:w-auto hover:bg-white hover:text-black hover:border-black">
                     <div class="flex items-center justify-center">
                        <ChevronLeftIcon class="w-6 h-6 mr-3"></ChevronLeftIcon>
                        Continue Shopping
                     </div>
                  </router-link>
               </div>
               <hr class="my-6">
            </div>
         </div>
      </section>

      <!-- shipping tax and subtotal -->
      <section>
         <div class="container mx-auto px-8 lg:px-24 mb-12">
            <div class="grid grid-cols-1 gap-x-8 md:grid-cols-2">
               <div>
                  <h3 class="font-bold text-lg mb-3 p-3 border border-gray-200 inline-block">Cart Total</h3>
                  <div class="p-3 bg-gray-100">
                     <div class="flex items-center justify-between mb-3 font-semibold">
                        <span>Item(s) Subtotal</span>
                        <span>{{ formatCurrency(cartStore.getCartTotal) }}</span>
                     </div>
                  </div>
               </div>
            </div>
            <hr class="my-6">
            <div class="text-center md:text-right">
               <a href="/checkout" @click.prevent="checkout"
                  class="inline-block p-3 text-lg font-semibold bg-black text-white transition-colors border border-transparent sm:w-auto hover:bg-white hover:text-black hover:border-black">
                  <div class="flex items-center justify-center">
                     Proceed to Checkout
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-5 h-5 ml-3">
                        <path fill-rule="evenodd"
                           d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                           clip-rule="evenodd" />
                     </svg>
                  </div>
               </a>
            </div>
         </div>
      </section>
   </template>
   <template v-else>
      <div class="container mx-auto px-8 lg:px-24 mb-12">
         <div class="flex justify-center items-center">
            <h1 class="text-3xl">There is nothing in cart yet.</h1>
         </div>
      </div>
   </template>

</template>

<script setup>
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useCartStore } from '@/stores/cart'
import { useShopStore } from '@/stores/shop'
import { formatCurrency } from "@/helpers"
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const shopStore = useShopStore();
const router = useRouter();

const checkout = function () {
   const items = [];
   cartStore.cart.items.map((item) => {
      items.push({ slug: item.slug, quantity: item.quantity })
   })
   shopStore.checkout({ items: JSON.stringify(items) })
      .then(res => {
         if (res.success) {
            shopStore.setPaymentData(res.data)            
            router.push({ name: 'Checkout'})
         }
      })
      .catch(err => console.log(err.response))
}

</script>