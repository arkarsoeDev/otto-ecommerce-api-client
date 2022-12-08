<template>
   <ProLayout></ProLayout>
   <ProductsLayout :products="products"></ProductsLayout>
</template>

<script setup>
import ProLayout from '@/components/Front/ProLayout.vue'
import ProductsLayout from '@/components/Front/ProductsLayout.vue';

const products = [
   {name: 'glasses', slug: 'glasses', details: 'details',photos: [], price: '$33.99'}
]
</script>