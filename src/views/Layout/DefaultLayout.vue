<template>
   <div :class="{'overflow-hidden h-screen' : appStore.mobileNav}">
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
import { useAppStore } from '../../stores/app';

const appStore = useAppStore();

const toggleMobileNav = function () {
   appStore.toggleMobileNav();
}

</script>