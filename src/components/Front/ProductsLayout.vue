<template>
      <section class="bg-gray-100">
         <div class="container mx-auto px-8 py-8 lg:px-24">
            <h1 class="text-2xl font-bold mb-8">Latest Products</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
               <Product v-for="product in products" :product="product"></Product>
            </div>
            <div class="w-full text-center">
               <a href=""
                  class="inline-block p-2 bg-slate-800 text-white border border-slate-800 transition hover:bg-white hover:text-black">View
                  More</a>
            </div>
         </div>
      </section>
</template>

<script setup>
import Product from '@/components/Front/Product.vue';

const { products } = defineProps(['products'])

</script>