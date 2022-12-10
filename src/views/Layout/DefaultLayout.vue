<template>
   <div class="flex flex-col min-h-screen" :class="{ 'overflow-hidden h-screen': appStore.mobileNav }">
      <header>
         <Nav></Nav>
      </header>
      <RouterView />
      <Footer></Footer>
      <Backdrop v-if="appStore.mobileNav" @click="toggleMobileNav"></Backdrop>
   </div>
</template>
<script setup>
import Nav from '@/components/Front/nav.vue'
import Footer from '@/components/Front/Footer.vue'
import Backdrop from '@/components/Front/Backdrop.vue'
import { RouterView } from 'vue-router';
import { watch } from 'vue';
import { useAppStore } from '../../stores/app';
import Swal from 'sweetalert2';


const appStore = useAppStore();

watch(() => appStore.message, (newValue, oldValue) => {
   if (newValue) {
      showToast(newValue)
   }
}, { deep: true})

const showToast =function(message) {
   const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
   })

   Toast.fire({
      icon: message.type,
      title: message.content
   })
}

const toggleMobileNav = function () {
   appStore.toggleMobileNav();
}

</script>