<template>
   <Breadcrumb>
      <BreadcrumbItem name="Checkout" urlName="Checkout">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <section v-if="paymentData">
      <div class="container mx-auto px-8 lg:px-24 mb-12">
         <div class="grid grid-cols-1 gap-y-8 md:gap-y-0 md:gap-x-8 md:grid-cols-12 ">
            <div class="md:col-span-7 lg:col-span-8">
               <h1 class="text-2xl font-bold mb-8">Billing Detail</h1>
               <div class="mb-3">
                  <form id="BillingForm" @submit.prevent="handleSubmit">
                     <Input id="name" name="name" class="mb-4" v-model="billing.name" placeholder="Name"
                        :errorMessage="errors.name ? errors.name[0] : false">Name</Input>

                     <Input id="email" name="email" type="email" class="mb-4" v-model="billing.email"
                        placeholder="Email" :errorMessage="errors.email ? errors.email[0] : false">Eamil</Input>

                     <Input id="phone" name="phone" class="mb-4" v-model="billing.phone" placeholder="Phone"
                        :errorMessage="errors.phone ? errors.phone[0] : false">Phone</Input>
                     <Input id="address" name="address" class="mb-4" v-model="billing.address" placeholder="Address"
                        :errorMessage="errors.address ? errors.address[0] : false">Address</Input>
                     <Input id="state" name="state" class="mb-4" v-model="billing.state" placeholder="State"
                        :errorMessage="errors.state ? errors.state[0] : false">State</Input>
                     <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                        <Input id="Postal/Zip" name="Posatal/Zip" class="mb-4" v-model="billing.postal_code"
                           placeholder="Postal Code"
                           :errorMessage="errors.postal_code ? errors.postal_code[0] : false">Postal /
                        Zip</Input>
                        <Input id="city" name="city" class="mb-4" v-model="billing.city" placeholder="City"
                           :errorMessage="errors.city ? errors.city[0] : false">Town / City</Input>
                     </div>
                  </form>
               </div>

               <div class="mb-8">
                  <h1 class="text-2xl font-bold mb-8">Payment Detail</h1>
                  <div id="card-input">
                     <!-- stripe here -->
                  </div>
                  <p v-if="errors.card" class="mt-2 text-sm text-red-600 dark:text-red-500"><span
                        class="font-medium">Oh,
                        snapp! </span>{{ errors.card }}</p>
               </div>
            </div>

            <div class="md:col-span-5 lg:col-span-4">
               <h1 class="text-2xl font-bold mb-8">Your Order</h1>
               <div v-for="(item, index) in paymentData.items" :key="index" class="mb-8">
                  <div class="flex gap-x-4 pb-3 border-b mb-3">
                     <img :src="item.photos[0] ? item.photos[0].url : ''" class="w-16 h-16" alt="">
                     <div class="font-semibold">
                        <div>{{ item.name }}</div>
                        <div class="text-green-700">{{ formatCurrency(item.price) }}</div>
                        <div>Qty : {{ item.quantity }}</div>
                     </div>
                  </div>
               </div>
               <div class="bg-gray-100 p-3 mb-8">
                  <div class="flex justify-between pb-3 border-b border-gray-300 mb-3">
                     <span class="font-semibold">OrderPlace</span>
                     <span>{{ now }}</span>
                  </div>
                  <div class="flex justify-between pb-3 border-b border-gray-300 mb-3">
                     <span class="font-semibold">Total</span>
                     <span class="font-bold text-green-700">{{ formatCurrency(paymentData.total) }}</span>
                  </div>
               </div>
               <div class="relative block">
                  <button type="submit" form="BillingForm" :disabled="submitting" href="/checkout"
                     class="block w-full p-3 text-lg font-semibold bg-black text-white transition-colors border border-transparent hover:bg-white hover:text-black hover:border-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-70">
                     <div class="flex items-center justify-center">
                        <span class="mr-3">Place Order</span>
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
      </div>
   </section>
   <div v-else>
      <h1>loading ...</h1>
   </div>
</template>
<script setup>
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useCartStore } from '@/stores/cart'
import { useShopStore } from '@/stores/shop'
import { useAppStore } from '@/stores/app'
import Input from '@/components/Front/Input.vue';
import { onMounted, ref } from 'vue';
import { formatCurrency } from '@/helpers'
import { useRouter } from 'vue-router';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { loadStripe } from '@stripe/stripe-js'
import NProgress, { done } from 'nprogress';
import 'nprogress/nprogress.css';
import Loading from '@/components/Front/Loading.vue';

const cartStore = useCartStore();
const shopStore = useShopStore();
const appStore = useAppStore();
const router = useRouter();
const billing = ref({
   name: 'arkar',
   email: 'a@clone.com',
   phone: '000',
   address: 'California',
   state: 'California',
   postal_code: '442',
   city: 'Cali'
});

const now = new Date(Date.now()).toDateString()
const paymentData = ref(null)
const submitting = ref(false)
let paymentElement = null
const stripe = ref(null)

const errors = ref({})

if (!(cartStore.cart.items.length > 0)) {
   router.push({ name: 'Shop' })
}

onMounted(async () => {
   if (!(shopStore.paymentData)) {
      router.push({ name: 'CartView' })
      return
   }
   paymentData.value = shopStore.paymentData;
   try {
      NProgress.start()
      stripe.value = await loadStripe(paymentData.value.publicKey)
      const elements = stripe.value.elements({
         clientSecret: paymentData.value.clientSecret
      })

      paymentElement = elements.create('card', {
         classes: {
            base: 'form-input w-full p-4',
            focus: 'border-blue-800 ring-1 ring-blue-800'
         },
         hidePostalCode: true
      });

      const res = await paymentElement.mount('#card-input');
   } catch (e) {
      console.log(e)
   } finally {
      NProgress.done()
   }
})

const createStripeToken = () => {
   return stripe.value.createToken(paymentElement).then(function (result) {
      if (result.error) {
         return result
      } else {
         return result.token.id;
      }
   })
}

const handleSubmit = async () => {
   submitting.value = true
   NProgress.start()
   if (window.navigator.onLine) {
      try {
         const stoken = await createStripeToken()
         if (stoken.error) {
            stoken.name = "stoken"
            throw stoken
         }
         const res = await shopStore.payment({
            ...billing.value,
            pi: paymentData.value.paymentIntentId,
            stoken: stoken
         })
         if (res.success) {
            cartStore.clearCart();
            console.log(res.success_message)
            shopStore.setPaymentMessage(res.success_message)
            NProgress.done()
            router.push({ name: 'Summary' })
         }
         console.log(res)
      } catch (error) {
         if (error.name === "stoken") {
            errors.value.card = error.error.message
            return
         }
         errors.value = error.response.data.errors
      }
      finally {
         NProgress.done()
         submitting.value = false
      }
   } else {
      console.log('herer')
      appStore.addMessage({
         type: 'error',
         content: 'No Internet Connection!'
      })
      submitting.value = false
      NProgress.done()
   }
}

</script>