<template>
   <nav aria-label="Breadcrumb">
      <div class="container px-8 my-8 mx-auto lg:px-24">
         <ul class="inline-flex items-center space-x-1 md:space-x-3">
            <BreadcrumbItem name="Home" urlName="Home"><HomeIcon class="w-4 h-4"></HomeIcon></BreadcrumbItem>
            <BreadcrumbItem name="Shop" urlName="Shop" aria-current="page"><ChevronLeftIcon class="w-5 h-5 font-semibold"></ChevronLeftIcon></BreadcrumbItem>
         </ul>
      </div>
   </nav>
</template>

<script setup>
import BreadcrumbItem from './Partial/BreadcrumbItem.vue';
import { HomeIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid';

</script>