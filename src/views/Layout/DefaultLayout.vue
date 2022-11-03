<template>
   <div class="flex flex-col min-h-screen" :class="{'overflow-hidden h-screen' : appStore.mobileNav}">
      <header>
         <Nav></Nav>
         <Breadcrumb v-if="route.name !== 'Home'"></Breadcrumb>
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
import { RouterView, useRoute } from 'vue-router';
import { useAppStore } from '../../stores/app';
import Breadcrumb from '@/components/Front/Breadcrumb.vue';

const appStore = useAppStore();
const route = useRoute();

const toggleMobileNav = function () {
   appStore.toggleMobileNav();
}

</script>