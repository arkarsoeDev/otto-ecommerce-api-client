<template>
   <Breadcrumb>
      <BreadcrumbItem name="Orders" urlName="Orders" aria-current="page">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <template v-if="!loading">
      <section>
         <div class="mt-3 mb-9">
            <h1 class="text-4xl font-semibold">Orders</h1>
         </div>
         <div
            class="bg-white shadow-sm flex flex-col items-start justify-between border w-full p-3 mb-3 sm:flex-row sm:items-center">
            <div class="mb-3 sm:mb-0">
               <span class="inline-block mr-3">Per Page</span><input @change="fetchOrders(null)" type="text"
                  v-model="perPage" class="form-input px-3 py-1 w-16 h-[45px]">
            </div>
            <Search v-model="search" @fetchPayload="fetchOrders(null)"></Search>
         </div>
         <div class="overflow-x-auto border shadow-sm mb-3">
            <table class="table overflow-hidden w-full">
               <thead class="text-left whitespace-nowrap text-gray-700 uppercase bg-gray-100">
                  <tr>
                     <th class="py-3 px-6">Id</th>
                     <th class="py-3 px-6">Total Price</th>
                     <th class="py-3 px-6">Created At</th>
                     <th class="py-3 px-6">Action</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="order in orders.data" :key="order.id" class="bg-white border-b">
                     <td class="py-3 px-6"><span class="font-bold">{{ order.id }}</span></td>
                     <td class="py-3 px-6"><span class="font-semibold">{{ formatCurrency(order.billing_total) }}</span>
                     </td>
                     <td class="py-3 px-6"><span class="font-semibold">{{ formatDate(order.created_at) }}</span>
                     </td>
                     <td class="py-3 px-6 whitespace-nowrap">
                        <div>
                           <router-link :to="{
                              name: 'Order', params: { id: order.id }
                           }"
                              class="text-gray-100 bg-blue-500 inline-block border border-transparent p-2 transition-colors hover:text-blue-500 hover:bg-white hover:border-blue-500">
                              <EyeIcon class="w-5 h-5"></EyeIcon>
                           </router-link>
                        </div>
                     </td>
                  </tr>
                  <tr v-if="orders.data.length <= 0">
                     <td class="py-9 text-xl bg-white text-center font-bold" colspan="4">There is no order yet</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div v-if="orders.meta && orders.meta.last_page <= 1 ? false : true"
            class="bg-white shadow-sm text-center border w-full p-3 mb-9 sm:flex sm:items-center sm:justify-between">
            <div v-if="!appStore.mobile" class="font-semibold mb-3 my-auto">
               <p>Showing from {{ orders.meta.from }} to {{ orders.meta.to }} in total {{ orders.meta.total }} items
               </p>
            </div>
            <!-- pagination -->
            <Pagination v-if="appStore.mobile && orders.links" :mobile="appStore.mobile" :links="orders.links"
               @fetchLink="fetchOrders"></Pagination>
            <Pagination v-if="orders.meta && !appStore.mobile" :mobile="appStore.mobile" :links="orders.meta.links"
               @fetchLink="fetchOrders"></Pagination>
         </div>
      </section>
   </template>
   <template v-if="loading">
      <div>
         <p>Loading ...</p>
      </div>
   </template>
</template>

<script setup>
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import Pagination from '@/components/Front/Pagination.vue';
import Search from '@/components/Front/Search.vue';
import { formatCurrency, formatDate } from '@/helpers';
import { ChevronLeftIcon, EyeIcon } from '@heroicons/vue/24/outline';
import { onMounted, ref } from 'vue';
import { useOrderStore } from '@/stores/order';
import { useAppStore } from '@/stores/app';

const orderStore = useOrderStore()
const appStore = useAppStore()
const orders = ref({})
const loading = ref(true)
const search = ref('')
const perPage = ref(8)

onMounted(() => {
   fetchOrders();
})

const fetchOrders = async (url = null, page = null) => {
   loading.value = true
   try {
      const res = await orderStore.fetchOrders({
         url,
         search: search.value,
         per_page: perPage.value,
         page: page
      })
      console.log(res)
      orders.value = res
   } finally {
      loading.value = false
   }
}


</script> 