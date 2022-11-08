<template>
   <div class="text-center max-w-xs min-w-[190px] mx-auto border border-transparent transition hover:border-slate-400">
      <div class="flex flex-col bg-white p-3">
         <div class="group relative mb-3 h-52 md:h-44 border border-gray-200">
            <a href=""
               class="absolute top-1 right-1 border border-black rounded-full p-1 z-10 transition-opacity hidden opacity-0 group-hover:block group-hover:opacity-100 hover:text-white hover:bg-slate-600">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                     d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
               </svg>
            </a>
            <img :src="product.photo ? product.photo[0] : ''"
               class="object-contain w-full h-full transition group-hover:blur-sm" alt="" />
         </div>
         <div>
            <a href=""
               class="block font-semibold mb-3 transition hover:underline underline-offset-4">
               {{ product.name }}
            </a>
            <p class="text-sm mb-2 line-clamp-2 h-[40px]">
               {{ product.details }}
            </p>
            <span class="mb-2 font-bold">{{ formatCurrency(product.price) }}</span>
         </div>
      </div>
      <router-link :to="{name: 'ProductView', params: {slug: product.slug}}"
         class="block p-2 bg-black text-white border-t border-slate-400 transition hover:bg-white hover:text-black">Product
         Detail</router-link>
   </div>
</template>

<script setup>
import { formatCurrency } from '@/helpers';
const { product } = defineProps(['product'])


</script>