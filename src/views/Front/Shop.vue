<template>
   <Breadcrumb>
      <BreadcrumbItem name="Shop" urlName="Shop" aria-current="page">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <section v-if="!loading">
      <div class="container mx-auto px-8 lg:px-24">
         <h1 class="text-3xl font-bold mb-16">Products</h1>
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- left -->
            <div class="lg:col-span-3">
               <div class="p-2 border border-gray-400">
                  <Collapse :categories="categories" @filterCat="filter"></Collapse>
               </div>
            </div>
            <!-- right -->
            <div class="lg:col-span-9">
               <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-4">

                  <!-- filter by -->
                  <div class="sm:col-span-2 md:col-span-3 xl:col-span-4">
                     <div class="flex flex-col lg:flex-row items-center justify-between">
                        <div class="mb-6 flex items-center justify-between lg:my-0" v-if="shopStore.activeCategory">
                           <span>FilterBy : </span>
                           <span class="px-3 py-2 bg-gray-200 ml-3">{{ shopStore.activeCategory.key.category }}</span>
                        </div>
                        <div class="my-6 lg:my-0" v-else>
                           <h1 class="text-2xl font-bold underline underline-offset-4">Featured Items</h1>
                        </div>
                        <div class="mb-6 flex items-center justify-between lg:my-0">
                           <span>Price:</span>
                           <div class="pl-4 py-2 text-gray-500"
                              :class="{ 'font-bold text-black': shopStore.activeSort && shopStore.activeSort.key.sort === 'low_high' }">
                              <a href="" @click.prevent="filter({ type: 'sort', key: { sort: 'low_high' } })">Low
                                 to High</a>
                           </div>
                           <div class="pl-4 py-2 text-gray-500"
                              :class="{ 'font-bold text-black': shopStore.activeSort && shopStore.activeSort.key.sort === 'high_low' }">
                              <a href="" @click.prevent="filter({ type: 'sort', key: { sort: 'high_low' } })">Hight
                                 to Low</a>
                           </div>
                        </div>
                     </div>
                  </div>

                  <Product v-for="product in products.data" :product="product"></Product>

                  <div class="sm:col-span-2 md:col-span-3 xl:col-span-4">
                     <hr class="mt-6" />
                     <div class="text-center my-8">
                        <!-- pagination -->
                        <Pagination v-if="appStore.mobile && products.links" :mobile="appStore.mobile"
                           :links="products.links" @fetchLink="fetchProducts"></Pagination>
                        <Pagination v-if="products.meta && !appStore.mobile" :mobile="appStore.mobile"
                           :links="products.meta.links" @fetchLink="fetchProducts"></Pagination>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </section>

</template>

<script setup>
import { onMounted, ref, } from 'vue';
import { useShopStore } from '@/stores/shop'
import { useAppStore } from '@/stores/app';
import Pagination from '@/components/Front/Pagination.vue';
import Collapse from '@/components/Front/Collapse.vue';
import Product from '@/components/Front/Product.vue';
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '../../components/Front/Partial/BreadcrumbItem.vue';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

const shopStore = useShopStore()
const appStore = useAppStore()

const categories = ref([])
const products = ref({})
const loading = ref(true)

const fetchProducts = async (url) => {
   products.value = await shopStore.fetchProducts(url)
}

const filter = async (key) => {
   let newParams = {
      ...key.key
   }
   if (shopStore.activeCategory && shopStore.activeCategory.type !== key.type) {
      newParams = { ...newParams, ...shopStore.activeCategory.key }
   }
   if (shopStore.activeSort && shopStore.activeSort.type !== key.type) {
      newParams = { ...newParams, ...shopStore.activeSort.key }
   }
   try {
      products.value = await shopStore.fetchProducts("/api/v1/products", { params: newParams })
   } finally {
      if (key.type === 'sort') shopStore.setActiveSort(key)
      if (key.type === 'category') shopStore.setActiveCategory(key)
   }
}

onMounted(async () => {
   loading.value = true
   try {
      categories.value = await shopStore.fetchCategories();
      products.value = await shopStore.fetchProducts("/api/v1/products");
      console.log(products.value)
      console.log('get all')
   } finally {
      console.log('loading done')
      loading.value = false
   }
})

</script>