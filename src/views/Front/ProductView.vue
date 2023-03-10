<template>
   <template v-if="!loading">
      <Breadcrumb>
         <BreadcrumbItem name="Shop" urlName="Shop">
            <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
         </BreadcrumbItem>
         <BreadcrumbItem :name="product.slug" urlName="ProductView" aria-current="page">
            <ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon>
         </BreadcrumbItem>
      </Breadcrumb>
      <section>
         <div class="grid grid-cols-1 gap-8 mb-20 xl:grid-cols-12">
            <!-- left image -->
            <div class="xl:col-span-5">
               <div class="h-60 sm:h-80 md:h-96 xl:h-[27rem] mb-6 border bg-white">
                  <img ref="mainImage" :src="product.photos[0] ? product.photos[0].url : ''"
                     class="main-image w-full h-full object-contain" alt="">
               </div>

               <div class="h-[60px] min-[425px]:h-[100px] md:h-[145px] lg:h-[145px] xl:h-[100px] overflow-auto">
                  <swiper :modules="modules" :slidesPerView="4" :centeredSlides="false" :spaceBetween="10" :pagination="{
                     type: 'progressbar',
                  }" :scrollbar="true" :navigation="false" :virtual="true" class="mySwiper" @swiper="setSwiperRef">
                     <swiper-slide v-for="(photo, index) in product.photos" :key="index" :virtualIndex="index">
                        <img @click="changeImage(photo.url)" :src="photo.url"
                           class="side-image w-full h-full select-none shadow-lg hover:cursor-pointer" alt="">
                     </swiper-slide>
                  </swiper>
               </div>
            </div>

            <!-- right section -->
            <div class="xl:col-span-7">
               <div class="sm:mb-6 sm:flex sm:items-center sm:justify-between">
                  <h1 class="font-bold mb-3 text-3xl sm:mb-0">{{ product.name }}</h1>
                  <div class="hidden sm:block">
                     <span class="mr-3">Availability:</span><span class="p-1 px-2"
                        :class="product.stock > 0 ? 'bg-green-400' : 'bg-red-400'">{{ product.stock
                              > 0 ? 'In stock' : 'Out of stock'
                        }}</span>
                  </div>
               </div>
               <div class="mb-3 sm:hidden">
                  <span class="mr-3">Availability:</span><span class="p-1 px-2"
                     :class="product.stock > 0 ? 'bg-green-400' : 'bg-red-400'">{{ product.stock > 0 ? 'In stock' :
                           'Out of stock'
                     }}</span>
               </div>
               <div class="mb-6">
                  <span class="text-green-700 font-bold text-3xl">{{ formatCurrency(product.price) }}</span>
               </div>
               <p class="text-xl mb-6 font-bold">{{ product.details }}</p>
               <p class="mb-12">{{ product.description }}</p>
               <div class="flex flex-col items-start select-none sm:flex-row">
                  <div class="flex items-center mb-6">
                     <span class="mr-3">Qty:</span>
                     <input :disabled="product.stock <= 0" type="number" id="qty"
                        class="text-center border-2 border-gray-300 w-12 h-14 mr-3 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-300"
                        v-model="quantity" @focusout="quantity && quantity <= stock ? quantity : quantity = 0">
                     <div class="inline-flex flex-col justify-between h-14 sm:mr-6">
                        <button :disabled="product.stock <= quantity" @click="quantity++" id="qtyPlus"
                           class="border-2 border-black inline hover:cursor-pointer disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                              class="w-5 h-5">
                              <path
                                 d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" />
                           </svg>
                        </button>
                        <button :disabled="quantity <= 0" @click="quantity > 0 ? quantity-- : ''" id="qtyMinus"
                           class="border-2 border-black inline hover:cursor-pointer disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400"><svg
                              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                              class="w-5 h-5">
                              <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
                           </svg></button>
                     </div>
                  </div>
                  <button :disabled="quantity == 0" @click.prevent="addToCart({ ...product })"
                     class="h-14 p-3 w-full text-lg font-semibold bg-black text-white transition-colors border border-transparent sm:w-auto hover:bg-white hover:text-black hover:border-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-gray-300 disabled:border-gray-200">
                     <div class="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                           class="w-5 h-5 mr-3">
                           <path fill-rule="evenodd"
                              d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                              clip-rule="evenodd" />
                        </svg>
                        Add To Cart
                     </div>
                  </button>
               </div>
               <hr class="my-6 border-gray-400">
               <div
                  class="inline-flex items-center mb-3 text-gray-400 transition-colors hover:text-red-500 hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-3 ">
                     <path
                        d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                  </svg>

                  <span class="text-black">Add to wishlist</span>
               </div>
            </div>
         </div>
      </section>

      <!-- people also buy -->
      <section>
         <div class="mb-20">
            <h3 class="text-2xl font-bold mb-6">People Also Buy</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-y-0 xl:grid-cols-4">
               <Product v-for="product in peopleAlsoBuy" :product="product"></Product>
            </div>
         </div>
      </section>
   </template>
   <template v-else>
      <Loading class="flex items-center justify-center h-screen w-full" layout="w-12 h-12"></Loading>
   </template>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useShopStore } from '@/stores/shop'
import Product from '@/components/Front/Product.vue';
import Breadcrumb from '@/components/Front/Breadcrumb.vue';
import Loading from '@/components/Front/Loading.vue';
import BreadcrumbItem from '@/components/Front/Partial/BreadcrumbItem.vue';
import { formatCurrency } from '@/helpers';
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';
import { useCartStore } from '@/stores/cart';
import { useAppStore } from '@/stores/app';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import 'swiper/css/virtual';

import { Pagination, Navigation, Virtual } from 'swiper';

let swiperRef = null;

const modules = [Pagination, Navigation, Virtual]

const setSwiperRef = (swiper) => {
   swiperRef = swiper;
};

const shopStore = useShopStore()
const cartStore = useCartStore()
const appStore = useAppStore()
const props = defineProps(['slug'])

const product = ref({})
const peopleAlsoBuy = ref([])
const loading = ref(true)
const quantity = ref(0)
const mainImage = ref(null)

const changeImage = function (url) {
   mainImage.value.src = url
}

watch(() => props.slug, (news, olds) => {
   fetchProduct()
})

const fetchProduct = async () => {
   try {
      loading.value = true
      const productRes = await shopStore.fetchProduct(props.slug)
      product.value = productRes.data
      peopleAlsoBuy.value = productRes.peopleAlsoBuy
   } catch (err) {
      loading.value = false
   } finally {
      loading.value = false
      quantity.value = product.value.stock > 0 ? 1 : 0
   }
}

const addToCart = function (paraProduct) {
   paraProduct.quantity = quantity.value
   cartStore.addToCart(paraProduct)
   appStore.addMessage({
      type: 'success',
      content: paraProduct.name + " is added to Cart"
   })
}

onMounted(() => {
   fetchProduct()
})

</script>
<style scoped>
.swiper-slide {
   text-align: center;
   font-size: 18px;
   background: #000;

   /* Center slide text vertically */
   display: -webkit-box;
   display: -ms-flexbox;
   display: -webkit-flex;
   display: flex;
   -webkit-box-pack: center;
   -ms-flex-pack: center;
   -webkit-justify-content: center;
   justify-content: center;
   -webkit-box-align: center;
   -ms-flex-align: center;
   -webkit-align-items: center;
   align-items: center;
}

.swiper-slide img {
   display: block;
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.swiper {
   width: 100%;
   height: 100%;
}
</style>