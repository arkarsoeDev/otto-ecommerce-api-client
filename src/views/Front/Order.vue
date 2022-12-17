<template>
   <Breadcrumb>
      <BreadcrumbItem name="Orders" urlName="Orders">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
      <BreadcrumbItem :name="order.id" urlName="Order" aria-current="page">
         <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
      </BreadcrumbItem>
   </Breadcrumb>
   <template v-if="!loading">
      <div class="flex items-center justify-between mt-3 mb-9">
         <h1 class="text-4xl font-semibold">Order Detail</h1>
         <router-link class="p-3 px-6 shadow-md text-lg bg-white font-semibold" :to="{ name: 'Orders' }">Back
         </router-link>
      </div>
      <div class="bg-white border text-xl p-2 mb-9 sm:p-6">
         <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
            <div class="md:col-span-3">
               <InfoItem class="bg-gray-100" name="Id">
                  <span>{{ order.id }}</span>
               </InfoItem>
               <InfoItem class="bg-gray-100" name="Shipped">
                  <span :class="{ 'bg-green-300': order.shipped != 0, 'bg-yellow-300': order.shipped == 0 }">{{
                        order.shipped
                  }}</span>
               </InfoItem>
               <InfoItem class="bg-gray-100" name="Phone">
                  <span>{{ order.billing_phone }}</span>
               </InfoItem>
               <InfoItem class="bg-gray-100" name="Billing Total">
                  <span>{{ order.billing_total }}</span>
               </InfoItem>
               <InfoItem class="bg-gray-100 mb-0" name="Order Date">
                  <span>{{ order.created_at }}</span>
               </InfoItem>
            </div>
            <div class="md:col-span-2">
               <div class="bg-gray-100 p-3">
                  <h3 class="text-2xl font-bold mb-3">
                     Address
                  </h3>
                  <InfoItem class="bg-white" name="Address">
                     <span>{{ order.billing_address }}</span>
                  </InfoItem>
                  <InfoItem class="bg-white" name="City">
                     <span>{{ order.billing_city }}</span>
                  </InfoItem>
                  <InfoItem class="bg-white" name="State">
                     <span>{{ order.billing_state }}</span>
                  </InfoItem>
               </div>
            </div>
         </div>
      </div>
   </template>
   <template v-if="loading">
      <Loading></Loading>
   </template>
</template>

<script setup>
import Loading from '@/components/Front/Loading.vue';
import InfoItem from '@/components/Front/Partial/InfoItem.vue';
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { ref, onMounted } from 'vue';
import { useOrderStore } from '@/stores/order';

const orderStore = useOrderStore()
const props = defineProps(['id'])
const loading = ref(true)

const order = ref({})

onMounted(() => {
   fetchOrder()
})

const fetchOrder = async function () {
   try {
      const data = await orderStore.fetchOrder(props.id)
      order.value = data.data
   } catch (err) {
      console.log(err)
   } finally {
      loading.value = false
   }
}
</script>