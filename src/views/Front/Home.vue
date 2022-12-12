<template>
   <ProLayout></ProLayout>
   <ProductsLayout :products="products"></ProductsLayout>
</template>

<script setup>
import ProLayout from '@/components/Front/ProLayout.vue'
import ProductsLayout from '@/components/Front/ProductsLayout.vue';
import { useShopStore } from '@/stores/shop'
import { ref, onMounted } from 'vue';

const shopStore = useShopStore();
const loading = ref(true)

const products = ref({})

const fetchProducts = async (url = null) => {
   loading.value = true
   try {
      let res = await shopStore.fetchProducts({
         url: url,
         search: null,
         category: null,
         sort: null,
         paginate: 'false',
         count: 10
      })
      products.value = res.data
   } catch (error) {
      console.log(error)
   }
   finally {
      loading.value = false
   }
}


onMounted(() => {
   fetchProducts()
})
</script>