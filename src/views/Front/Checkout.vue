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
                     <Input id="name" name="name" class="mb-4" v-model="billing.name">Name</Input>
                     <Input id="email" name="email" type="email" class="mb-4" v-model="billing.email">Eamil</Input>
                     <Input id="phone" name="phone" class="mb-4" v-model="billing.phone">Phone</Input>
                     <Input id="address" name="address" class="mb-4" v-model="billing.address">Address</Input>
                     <Input id="state" name="state" class="mb-4" v-model="billing.state">State</Input>
                     <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4">
                        <Input id="Postal/Zip" name="Posatal/Zip" class="mb-4" v-model="billing.postal_code">Postal /
                        Zip</Input>
                        <Input id="city" name="city" class="mb-4" v-model="billing.city">Town / City</Input>
                     </div>
                  </form>
               </div>

               <div class="mb-8">
                  <h1 class="text-2xl font-bold mb-8">Payment Detail</h1>
                  <div id="card-input">
                     <!-- stripe here -->
                  </div>
               </div>
            </div>


            <div class="md:col-span-5 lg:col-span-4">
               <h1 class="text-2xl font-bold mb-8">Your Order</h1>
               <div v-for="(item, index) in paymentData.items" :key="index" class="mb-8">
                  <div class="flex gap-x-4 pb-3 border-b mb-3">
                     <img :src="item.photos[0] ? item.photos[0].url:  ''" class="w-20 h-20" alt="">
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
               <button type="submit" form="BillingForm"
                  class="block w-full px-3 py-2 text-lg font-semibold bg-black text-white transition-colors border border-transparent hover:bg-white hover:text-black hover:border-black">
                  <div class="flex items-center justify-center">
                     Place Order
                     <ChevronRightIcon class="ml-3 w-5 h-5"></ChevronRightIcon>
                  </div>
               </button>
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
import Input from '@/components/Front/Input.vue';
import { onMounted, ref } from 'vue';
import { formatCurrency } from '@/helpers'
import { useRouter } from 'vue-router';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { loadStripe } from '@stripe/stripe-js'

const cartStore = useCartStore();
const shopStore = useShopStore();
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
let paymentElement = null
const stripe = ref(null)

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

      paymentElement.mount('#card-input');
   } catch (e) {
      console.log(e)
   }
})

const createStripeToken = () => {
   return stripe.value.createToken(paymentElement).then(function (result) {
      if (result.error) {
         console.log(result.error);
      } else {
         return result.token.id;
      }
   })
}  

const handleSubmit = async () => {
   console.log('click')
   const stoken = await createStripeToken()
   shopStore.payment({
      ...billing.value,
      pi: paymentData.value.paymentIntentId,
      stoken: stoken
   })
      .then(res => {
         if (res.success) {
            cartStore.clearCart();
            console.log(res.success_message)
            shopStore.setPaymentMessage(res.success_message)
            router.push({ name: 'Summary'})
         }
         console.log(res)
      })
      .catch(err => console.log(err))
}

</script>