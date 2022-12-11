<template>
   <Breadcrumb>
      <BreadcrumbItem name="Shop" urlName="Shop" aria-current="page">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <section v-if="!loading && products.data">
      <div class="container mx-auto px-8 lg:px-24">
         <div class="flex items-start justify-between flex-col mb-9 sm:mb-16 sm:flex-row sm:items-center">
            <h1 class="text-3xl font-bold mb-6 sm:mb-0">Products</h1>
            <form @submit.prevent="fetchProducts(null)" class="w-full sm:w-auto">
               <div class="flex items-center">
                  <input type="text" class="grow  h-[45px] form-input px-3 py-1 mr-2 sm:grow-0"
                     v-model="filterParam.search" placeholder="search">
                  <button type="submit" class="p-1 border border-gray-800 h-[45px]">
                     <MagnifyingGlassIcon class="w-7 h-5"></MagnifyingGlassIcon>
                  </button>
               </div>
            </form>
         </div>
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-9">
            <!-- left -->
            <div class="lg:col-span-3">
               <div class="p-2 border border-gray-400">
                  <Collapse :categories="categories" :activeCategory="filterParam.category" @filterCat="filter">
                  </Collapse>
               </div>
            </div>
            <!-- right -->
            <div class="lg:col-span-9">
               <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-4">

                  <!-- filter by -->
                  <div class="sm:col-span-2 md:col-span-3 xl:col-span-4">
                     <div class="flex flex-col lg:flex-row items-center justify-between">
                        <div class="mb-6 flex items-center justify-between lg:my-0" v-if="filterParam.category">
                           <span>FilterBy : </span>
                           <span class="px-3 py-2 bg-gray-200 ml-3">{{ filterParam.category }}</span>
                        </div>
                        <div class="my-6 lg:my-0" v-else>
                           <h1 class="text-2xl font-bold underline underline-offset-4">Featured Items</h1>
                        </div>
                        <div class="mb-6 flex items-center justify-between lg:my-0">
                           <span>Price:</span>
                           <div class="pl-4 py-2 text-gray-500 transition-colors hover:text-black"
                              :class="{ 'font-bold text-black': filterParam.sort === 'low_high' }">
                              <a href="" @click.prevent="filter({ type: 'sort', key: 'low_high' })">Low
                                 to High</a>
                           </div>
                           <div class="pl-4 py-2 text-gray-500 transition-colors hover:text-black"
                              :class="{ 'font-bold text-black': filterParam.sort === 'high_low' }">
                              <a href="" @click.prevent="filter({ type: 'sort', key: 'high_low' })">Hight
                                 to Low</a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <template v-if="products.data.length > 0">
                     <Product v-for="product in products.data" :product="product"></Product>
                  </template>
                  <template v-else>
                     <div class="flex items-center justify-center min-h-[200px] sm:col-span-2 md:col-span-3 xl:col-span-4">
                        <h1 class="font-bold text-xl">No product available!</h1>
                     </div>
                  </template>

                  <template v-if="products.meta.last_page > 1">
                     <div class="sm:col-span-2 md:col-span-3 xl:col-span-4">
                        <hr class="mt-6" />
                        <div class="text-center my-8">
                           <!-- pagination -->
                           <Pagination v-if="appStore.mobile && products.links" :mobile="appStore.mobile" :links="products.links"
                              @fetchLink="fetchProducts"></Pagination>
                           <Pagination v-if="products.meta && !appStore.mobile" :mobile="appStore.mobile" :links="products.meta.links"
                              @fetchLink="fetchProducts"></Pagination>
                        </div>
                     </div>
                  </template>
               </div>
            </div>
         </div>
      </div>
   </section>
   <template v-if="loading">
      <div>
         <p>Loading ...</p>
      </div>
   </template>
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
import { ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

const shopStore = useShopStore()
const appStore = useAppStore()

const categories = ref([])
const products = ref({})
const loading = ref(true)

const filterParam = ref({
   search: '',
   category: null,
   sort: null,
})

const fetchProducts = async (url = null) => {
   loading.value = true
   try {
      products.value = await shopStore.fetchProducts({
         url: url,
         search: filterParam.value.search,
         category: filterParam.value.category,
         sort: filterParam.value.sort,
      })
   } catch (error) {
      console.log(error)
   }
   finally {
      loading.value = false
   }
}

const fetchCategories = async function () {
   try {
      categories.value = await shopStore.fetchCategories();
   } catch (error) {
      console.log(error)
   } finally {
      loading.value = false
   }
}

const filter = async (param) => {
   filterParam.value[param.type] = param.key
   fetchProducts();
}

onMounted(() => {
   fetchCategories()
   fetchProducts()
})

</script>