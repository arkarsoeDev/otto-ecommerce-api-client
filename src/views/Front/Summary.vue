<template>
   <section v-if="!loading">
      <div class="w-full text-center my-20">
         <h1 class="text-2xl font-bold mb-3">Thank You for Your Order!</h1>
         <p class="mb-6">{{ shopStore.paymentMessage }}</p>
         <a href=""
            class="inline-block px-3 py-2 text-lg font-semibold bg-slate-900 text-white transition-colors border border-transparent sm:w-auto hover:bg-white hover:text-black hover:border-black">
            <div class="flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-3">
                  <path
                     d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path
                     d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
               </svg>

               Home Page
            </div>
         </a>
      </div>
   </section>
   <div v-else>
      <p>loading ...</p>
   </div>
</template>

<script setup>
import { useShopStore } from '@/stores/shop'
import { useCartStore } from '@/stores/cart'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { ref } from 'vue'

const shopStore = useShopStore()
const cartStore = useCartStore()
const loading = ref(true)
const router = useRouter()

onBeforeRouteLeave(() => {
   shopStore.setPaymentMessage(null)
   shopStore.setPaymentData(null)
   cartStore.clearCart();
})

if (!shopStore.paymentMessage) {
   router.push({ name: 'Shop' })
} else {
   loading.value = false
}
</script>