<template>
   <Breadcrumb>
      <BreadcrumbItem name="Cart" urlName="CartView">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>


   <template v-if="cartStore.cart.items.length > 0">
      <section>
         <div class="mb-12">
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
                           <td class="py-3 px-6"><img :src="item.photos[0] ? item.photos[0].url : ''"
                                 class="min-w-[7rem] h-28" alt=""></td>
                           <td class="py-3 px-6"><span class="font-bold">{{ item.name }}</span></td>
                           <td class="py-3 px-6"><span class="font-semibold">{{ formatCurrency(item.price) }}</span>
                           </td>
                           <td class="py-3 px-6">
                              <div class="flex items-center">
                                 <button @click="removeOneFromCart(index)" :disabled="item.quantity == 1" id="qtyMinus"
                                    class="border-2 border-black inline disabled:bg-gray-200 hover:cursor-pointer mr-2">
                                    <MinusIcon class="w-5 h-5"></MinusIcon>
                                 </button>
                                 <div id="item-1"
                                    class="cart-qty flex items-center justify-center border-2 border-gray-300 w-12 h-12">
                                    {{ item.quantity }}
                                 </div>
                                 <button @click="addToCart({ ...item })" id="qtyPlus"
                                    :disabled="item.stock <= item.quantity"
                                    class="border-2 border-black inline disabled:bg-gray-200 hover:cursor-pointer ml-2">
                                    <PlusIcon class="w-5 h-5"></PlusIcon>
                                 </button>
                              </div>
                           </td>
                           <td class="py-3 px-6"><span class="font-semibold">{{ formatCurrency(item.price *
                                 item.quantity)
                           }}</span></td>
                           <td class="py-3 px-6 whitespace-nowrap">
                              <div>
                                 <router-link :to="{
                                    name: 'ProductView', params: { slug: item.slug }
                                 }"
                                    class="text-gray-100 bg-sky-600 inline-block border border-transparent p-2 transition-colors hover:text-green-600 hover:bg-white hover:border-green-600">
                                    <EyeIcon class="w-5 h-5"></EyeIcon>
                                 </router-link>
                                 <a href="" @click.prevent="cartStore.removeFromCart(index)"
                                    class="text-gray-100 bg-red-600 inline-block p-2 border border-transparent transition-colors hover:text-red-600 hover:bg-white hover:border-red-600">
                                    <TrashIcon class="w-5 h-5"></TrashIcon>
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
         <div class="mb-12">
            <div class="grid grid-cols-1 gap-x-8 md:grid-cols-2">
               <div>
                  <h3 class="font-bold text-lg mb-3 p-3 border border-gray-200 inline-block">Cart Total</h3>
                  <div class="p-3 bg-gray-100">
                     <div class="flex items-center justify-between mb-3 font-semibold">
                        <span>Item(s) total</span>
                        <span>{{ formatCurrency(cartStore.getCartTotal) }}</span>
                     </div>
                     <div class="flex items-center justify-between mb-3 font-semibold">
                        <span>Item(s) Quantity</span>
                        <span>{{ cartStore.getCartQuantity }}</span>
                     </div>
                  </div>
               </div>
            </div>
            <hr class="my-6">
            <div class="text-center md:text-right">
               <div class="relative inline-block">
                  <button :disabled="submitting" href="/checkout" @click.prevent="checkout"
                     class="p-3 text-lg font-semibold bg-black text-white transition-colors border border-transparent sm:w-auto hover:bg-white hover:text-black hover:border-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-70">
                     <div class="flex items-center justify-center">
                        <span class="mr-3">Proceed to Checkout</span>
                        <ChevronRightIcon class="w-5 h-5 font-bold"></ChevronRightIcon>
                     </div>
                  </button>
                  <template v-if="submitting">
                     <div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <Loading class="text-gray-900 w-6 h-6"></Loading>
                     </div>
                  </template>
               </div>
            </div>
         </div>
      </section>
   </template>
   <template v-else>
      <div class="mb-12">
         <div class="flex justify-center items-center">
            <h1 class="text-3xl">There is nothing in cart yet.</h1>
         </div>
      </div>
   </template>

</template>

<script setup>
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import Loading from '@/components/Front/Loading.vue';
import { useCartStore } from '@/stores/cart'
import { useShopStore } from '@/stores/shop'
import { formatCurrency } from "@/helpers"
import { useRouter } from 'vue-router';
import { PlusIcon, MinusIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/vue/20/solid';
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const cartStore = useCartStore();
const shopStore = useShopStore();
const appStore = useAppStore();
const router = useRouter();

const submitting = ref(false)

const checkout = async function () {
   NProgress.start()
   if (window.navigator.onLine) {
      submitting.value = true
      const items = [];
      cartStore.cart.items.map((item) => {
         items.push({ slug: item.slug, quantity: item.quantity })
      })
      try {
         const res = await shopStore.checkout({ items: JSON.stringify(items) })
         if (res.success) {
            console.log(res.data)
            shopStore.setPaymentData(res.data)
            router.push({ name: 'Checkout' })
         }
      } catch (error) {
         if (err.response.status === 400) {
            appStore.addMessage({
               type: 'error',
               content: err.response.data.message
            })
         }
      }
      finally {
         NProgress.done()
         submitting.value = false
      }
   } else {
      appStore.addMessage({
         type: 'error',
         content: 'No Internet Connection!'
      })
      NProgress.done()
   }
}

const addToCart = function (item) {
   item.quantity = 1
   cartStore.addToCart(item)
}

const removeOneFromCart = function (index) {
   cartStore.removeOneFromCart(index)
}

</script>